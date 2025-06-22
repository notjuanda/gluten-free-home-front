import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { CartItem } from '../types/cart.type';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: CartItem['product'], quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'cart_items';

const getStoredCart = (): CartItem[] => {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return parsed.map((item: any) => ({
            ...item,
            product: {
                ...item.product,
                precioBob: Number(item.product.precioBob) || 0,
            },
        }));
    } catch (error) {
        console.error('Error al parsear carrito del localStorage:', error);
        return [];
    }
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(getStoredCart());
    }, []);

    const saveCart = (updated: CartItem[]) => {
        console.log('Guardando carrito:', updated);
        setCart(updated);
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(updated));
        } catch (error) {
            console.error('Error al guardar carrito en localStorage:', error);
        }
    };

    const addToCart = (product: CartItem['product'], quantity = 1) => {
        console.log('Intentando agregar al carrito:', product);
        console.log('Carrito actual:', cart);
        
        if (!product || !product.id) {
            console.error('Producto inválido:', product);
            return;
        }
        
        // Asegurar que precioBob sea un número válido
        const productWithValidPrice = {
            ...product,
            precioBob: Number(product.precioBob) || 0
        };
        
        const existing = cart.find(item => item.product.id === product.id);
        
        if (existing) {
            console.log('Producto ya existe en carrito, incrementando cantidad');
            const newQuantity = existing.quantity + quantity;
            
            if (newQuantity <= 0) {
                // Si la cantidad resultante es 0 o menor, eliminar el producto
                console.log('Cantidad resultante es 0 o menor, eliminando producto');
                removeFromCart(product.id);
                return;
            }
            
            const updated = cart.map(item =>
                item.product.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            );
            saveCart(updated);
        } else {
            if (quantity <= 0) {
                console.log('Cantidad inválida para nuevo producto:', quantity);
                return;
            }
            
            console.log('Agregando nuevo producto al carrito');
            saveCart([...cart, { product: productWithValidPrice, quantity }]);
        }
    };

    const removeFromCart = (productId: number) => {
        console.log('Eliminando producto del carrito:', productId);
        const updated = cart.filter(item => item.product.id !== productId);
        saveCart(updated);
    };

    const clearCart = () => {
        console.log('Limpiando carrito');
        saveCart([]);
    };

    // Función para limpiar productos corruptos del carrito
    const cleanCorruptedItems = () => {
        const validItems = cart.filter(item => 
            item.product && 
            item.product.id && 
            item.product.nombre &&
            !isNaN(Number(item.product.precioBob)) &&
            item.quantity > 0
        );
        
        if (validItems.length !== cart.length) {
            console.log('Limpiando productos corruptos del carrito');
            saveCart(validItems);
        }
    };

    // Limpiar productos corruptos al cargar el carrito
    useEffect(() => {
        if (cart.length > 0) {
            cleanCorruptedItems();
        }
    }, []);

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartItemCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
}; 
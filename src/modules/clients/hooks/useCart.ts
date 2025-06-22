import { useEffect, useState } from 'react';
import type { CartItem } from '../types/cart.type';

const CART_KEY = 'cart_items';

const getStoredCart = (): CartItem[] => {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return parsed.map((item: any) => ({
        ...item,
        product: {
        ...item.product,
        precioBob: Number(item.product.precioBob),
        },
    }));
    };


    export const useCart = () => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        setCart(getStoredCart());
    }, []);

    const saveCart = (updated: CartItem[]) => {
        setCart(updated);
        localStorage.setItem(CART_KEY, JSON.stringify(updated));
    };

    const addToCart = (product: CartItem['product'], quantity = 1) => {
        const existing = cart.find(item => item.product.id === product.id);
        if (existing) {
        const updated = cart.map(item =>
            item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        saveCart(updated);
        } else {
        saveCart([...cart, { product, quantity }]);
        }
    };

    const removeFromCart = (productId: number) => {
        const updated = cart.filter(item => item.product.id !== productId);
        saveCart(updated);
    };

    const clearCart = () => {
        saveCart([]);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
    };
};

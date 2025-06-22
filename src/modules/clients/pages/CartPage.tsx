import { useCart } from '../context/CartContext';
import CartItemCard from '../components/CartItemCard';
import OrderSummary from '../components/OrderSummary';
import RecommendedProducts from '../components/RecommendedProducts';
import { FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '@/modules/core/hooks/useAuth';
import LoginRequiredModal from '../components/LoginRequiredModal';
import { useState } from 'react';
import type { Product } from '@/modules/core/types/product.type';

const CartPage = () => {
    const { cart, removeFromCart, addToCart, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleIncrease = (productId: number) => {
        const item = cart.find(i => i.product.id === productId);
        if (item) {
            addToCart(item.product, 1);
        }
    };

    const handleDecrease = (productId: number) => {
        const item = cart.find(i => i.product.id === productId);
        if (item && item.quantity > 1) {
            addToCart(item.product, -1);
        } else {
            removeFromCart(productId);
        }
    };

    const handleAddToCart = (product: Product) => {
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }
        addToCart(product);
    };

    const handleProceedToCheckout = () => {
        // TODO: Implementar navegación al checkout
        console.log('Procediendo al checkout...');
        alert('Funcionalidad de checkout en desarrollo');
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FiShoppingCart className="w-8 h-8 text-primary" />
                        <h1 className="text-3xl font-bold text-foreground">Mi Carrito</h1>
                    </div>
                    <p className="text-muted-foreground">
                        Revisa tus productos y procede al pago
                    </p>
                </div>

                {cart.length === 0 ? (
                    /* Carrito vacío */
                    <div>
                        <div className="text-center py-16">
                            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <FiShoppingCart className="w-12 h-12 text-muted-foreground" />
                            </div>
                            <h2 className="text-2xl font-semibold text-foreground mb-2">
                                Tu carrito está vacío
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Agrega algunos productos para comenzar a comprar
                            </p>
                            <a
                                href="/explorar"
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Explorar Productos
                            </a>
                        </div>
                        
                        {/* Productos recomendados */}
                        <RecommendedProducts onAddToCart={handleAddToCart} />
                    </div>
                ) : (
                    /* Contenido del carrito */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lista de productos */}
                        <div className="lg:col-span-2">
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <CartItemCard
                                        key={item.product.id}
                                        item={item}
                                        onIncrease={handleIncrease}
                                        onDecrease={handleDecrease}
                                        onRemove={removeFromCart}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Resumen del pedido */}
                        <div className="lg:col-span-1">
                            <OrderSummary
                                cart={cart}
                                onProceedToCheckout={handleProceedToCheckout}
                                onClearCart={clearCart}
                            />
                        </div>
                    </div>
                )}
            </div>

            <LoginRequiredModal
                visible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </div>
    );
};

export default CartPage;

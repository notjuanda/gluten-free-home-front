import { useCart } from '../context/CartContext';
import CartItemCard from '../components/CartItemCard';
import OrderSummary from '../components/OrderSummary';
import RecommendedProducts from '../components/RecommendedProducts';
import { FiShoppingCart } from 'react-icons/fi';
import { useAuth } from '@/modules/core/hooks/useAuth';
import LoginRequiredModal from '../components/LoginRequiredModal';
import { useState } from 'react';
import type { Product } from '@/modules/core/types/product.type';
import AddressSelector from '../components/AddressSelector';
import StripeCheckout from '../components/StripeCheckout';
import { toast } from 'react-toastify';

const CartPage = () => {
    const { cart, removeFromCart, addToCart, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

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

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8">
                <div className="mb-6 sm:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <FiShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-primary" />
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Mi Carrito</h1>
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                        Selecciona tu dirección y procede al pago
                    </p>
                </div>

                {cart.length === 0 ? (
                    <div>
                        <div className="text-center py-10 sm:py-12 lg:py-16">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <FiShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-muted-foreground" />
                            </div>
                            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-foreground mb-2">
                                Tu carrito está vacío
                            </h2>
                            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 sm:mb-6 px-4">
                                Agrega algunos productos para comenzar a comprar
                            </p>
                            <a
                                href="/explorar"
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-xs sm:text-sm lg:text-base"
                            >
                                Explorar Productos
                            </a>
                        </div>
                        
                        {/* Productos recomendados */}
                        <RecommendedProducts onAddToCart={handleAddToCart} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {/* Lista de productos */}
                        <div className="xl:col-span-2">
                            <div className="space-y-3 sm:space-y-4">
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

                        {/* Columna derecha: Dirección y Resumen */}
                        <div className="xl:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
                            
                            <AddressSelector 
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={setSelectedAddressId}
                            />
                            
                            <OrderSummary
                                cart={cart}
                                onClearCart={clearCart}
                            />

                            <StripeCheckout
                                usuarioId={user?.id}
                                direccionEnvioId={selectedAddressId}
                                onSuccess={() => toast.success('Redirigiendo a la pasarela de pago...')}
                                onError={(error) => toast.error(error)}
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

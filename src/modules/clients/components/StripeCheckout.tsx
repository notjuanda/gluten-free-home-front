import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { useAuth } from '@/modules/core/hooks/useAuth';
import { Loader2, CreditCard } from 'lucide-react';
import type { StripeCheckoutProps } from '../types/products-components.type';

const StripeCheckout = ({ usuarioId, direccionEnvioId, onSuccess, onError }: StripeCheckoutProps) => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const createOrder = useCreateOrder();
    const stripeCheckout = useStripeCheckout();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        if (!usuarioId) {
            onError?.('Debes iniciar sesión para continuar');
            return;
        }

        if (!direccionEnvioId) {
            onError?.('Debes seleccionar una dirección de envío');
            return;
        }

        if (cart.length === 0) {
            onError?.('El carrito está vacío');
            return;
        }

        setIsProcessing(true);

        try {
            // Calcular totales
            const subtotal = cart.reduce((total, item) => {
                return total + (Number(item.product.precioBob) * item.quantity);
            }, 0);

            // Envío gratuito si el subtotal es mayor o igual a 100 Bs
            const shippingCost = subtotal >= 100 ? 0 : 15;
            const total = subtotal + shippingCost;

            // Crear la orden enviando solo los montos en BOB
            const orderData = {
                usuarioId,
                direccionEnvioId,
                totalBob: total,
                costoEnvioBob: shippingCost,
                items: cart.map(item => ({
                    productoId: item.product.id,
                    cantidad: item.quantity,
                })),
            };

            const order = await createOrder.mutateAsync(orderData);

            // Crear sesión de checkout de Stripe
            await stripeCheckout.mutateAsync({
                pedidoId: order.id,
            });

            // Limpiar carrito después de crear la orden
            clearCart();
            onSuccess?.();

        } catch (error) {
            console.error('Error en el checkout:', error);
            onError?.(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setIsProcessing(false);
        }
    };

    const isDisabled = isProcessing || cart.length === 0 || !usuarioId || !direccionEnvioId;

    return (
        <button
            onClick={handleCheckout}
            disabled={isDisabled}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
            {isProcessing ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Procesando...
                </>
            ) : (
                <>
                    <CreditCard className="h-5 w-5" />
                    Pagar con Stripe
                </>
            )}
        </button>
    );
};

export default StripeCheckout; 
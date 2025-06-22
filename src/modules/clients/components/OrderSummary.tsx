import { FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import type { OrderSummaryProps } from '../types/cart-components.type';

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, onClearCart }) => {
    // Función helper para asegurar que precioBob sea un número
    const formatPrice = (price: any) => {
        const numPrice = Number(price);
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const subtotal = cart.reduce(
        (sum, item) => sum + Number(item.product.precioBob) * item.quantity,
        0
    );

    // Envío gratuito si el subtotal es mayor a 100 Bs
    const shippingCost = subtotal >= 100 ? 0 : 15;
    const total = subtotal + shippingCost;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sticky top-4">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <h2 className="text-lg sm:text-xl font-bold text-foreground">Resumen del Pedido</h2>
            </div>

            {/* Resumen de productos */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Productos ({totalItems})</span>
                    <span className="font-medium">Bs {formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-medium">
                        {shippingCost === 0 ? (
                            <span className="text-green-600">Gratis</span>
                        ) : (
                            `Bs ${formatPrice(shippingCost)}`
                        )}
                    </span>
                </div>

                {shippingCost > 0 && (
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                        💡 Agrega Bs {formatPrice(100 - subtotal)} más para envío gratuito
                    </div>
                )}

                <div className="border-t border-border pt-2 sm:pt-3">
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                        <span>Total</span>
                        <span>Bs {formatPrice(total)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Incluye impuestos y envío
                    </p>
                </div>
            </div>

            {/* Botón de Vaciar Carrito */}
            {cart.length > 0 && (
                <button
                    onClick={onClearCart}
                    className="w-full bg-destructive/10 text-destructive py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                    <FiTrash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    Vaciar Carrito
                </button>
            )}

            {/* Información adicional */}
            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
                <div className="space-y-1.5 sm:space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                        <span>Envío seguro y rápido</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                        <span>Productos sin gluten certificados</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></div>
                        <span>Devolución gratuita en 30 días</span>
                    </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-xs">
                    ⚠️ El monto final en bolivianos puede variar unos centavos por producto debido a la conversión de moneda internacional.
                </div>
            </div>
        </div>
    );
};

export default OrderSummary; 
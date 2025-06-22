import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import type { CartItemCardProps } from '../types/cart-components.type';

const CartItemCard: React.FC<CartItemCardProps> = ({ 
    item, 
    onIncrease, 
    onDecrease, 
    onRemove 
}) => {
    // Función helper para asegurar que precioBob sea un número
    const formatPrice = (price: any) => {
        const numPrice = Number(price);
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    const itemTotal = Number(item.product.precioBob) * item.quantity;

    return (
        <div className="bg-card border border-border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Imagen del producto */}
                <div className="flex-shrink-0 flex justify-center sm:justify-start">
                    <img
                        src={
                            item.product.imagenes?.[0]?.urlImagen ??
                            '/logo-gluten-free-home.png'
                        }
                        alt={item.product.nombre}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-muted"
                    />
                </div>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-foreground truncate text-sm sm:text-base lg:text-lg">
                                {item.product.nombre}
                            </h3>
                            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                                {item.product.categoria?.nombre}
                            </p>
                            {item.product.marca && (
                                <p className="text-xs text-muted-foreground">
                                    Marca: {item.product.marca.nombre}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => onRemove(item.product.id)}
                            className="text-destructive hover:text-destructive/80 p-1 rounded-full hover:bg-destructive/10 transition-colors flex-shrink-0"
                            aria-label="Eliminar producto"
                        >
                            <FiTrash2 size={14} className="sm:w-4 sm:h-4" />
                        </button>
                    </div>

                    {/* Precio y controles de cantidad */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            {/* Controles de cantidad */}
                            <div className="flex items-center border border-border rounded-lg w-fit">
                                <button
                                    onClick={() => onDecrease(item.product.id)}
                                    className="p-1.5 sm:p-2 hover:bg-muted transition-colors rounded-l-lg"
                                    aria-label="Reducir cantidad"
                                >
                                    <FiMinus size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                                </button>
                                <span className="px-2 sm:px-3 py-1.5 sm:py-2 text-sm font-medium min-w-[1.5rem] sm:min-w-[2rem] text-center">
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => onIncrease(item.product.id)}
                                    className="p-1.5 sm:p-2 hover:bg-muted transition-colors rounded-r-lg"
                                    aria-label="Aumentar cantidad"
                                >
                                    <FiPlus size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                                </button>
                            </div>

                            {/* Precio unitario */}
                            <div className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                                Bs {formatPrice(item.product.precioBob)} c/u
                            </div>
                        </div>

                        {/* Precio total del item */}
                        <div className="text-left sm:text-right">
                            <div className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">
                                Bs {formatPrice(itemTotal)}
                            </div>
                            {item.quantity > 1 && (
                                <div className="text-xs text-muted-foreground">
                                    {item.quantity} × Bs {formatPrice(item.product.precioBob)}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Badges adicionales */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
                        {item.product.certificadoSinGluten && (
                            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                🌾 Sin Gluten
                            </span>
                        )}
                        {item.product.stock < 10 && item.product.stock > 0 && (
                            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                ⚠️ Solo {item.product.stock} disponibles
                            </span>
                        )}
                        {item.product.stock === 0 && (
                            <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                ❌ Sin stock
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItemCard; 
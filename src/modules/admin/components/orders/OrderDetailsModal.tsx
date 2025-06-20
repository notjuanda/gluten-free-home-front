import { createPortal } from 'react-dom';
import { FiX, FiPackage, FiUser, FiCalendar, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { useGetOrder } from '../../hooks/orders/useGetOrder';
import { useGetOrderItems } from '../../hooks/orders/useGetOrderItems';
import type { OrderDetailsModalProps } from '../../types/orders-components.type';

export default function OrderDetailsModal({ isOpen, onClose, orderId }: OrderDetailsModalProps) {
    const { data: order, isLoading, error } = useGetOrder({ id: orderId || 0, enabled: isOpen && !!orderId });
    const { data: items, isLoading: loadingItems } = useGetOrderItems({ orderId: orderId || 0, enabled: isOpen && !!orderId });

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative w-full max-w-2xl bg-background border border-border rounded-lg shadow-xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FiPackage className="w-5 h-5 text-primary" />
                        Detalles del Pedido
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" title="Cerrar">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                {/* Content */}
                <div className="p-6 space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="ml-2">Cargando pedido...</span>
                        </div>
                    ) : error || !order ? (
                        <div className="text-center py-8 text-red-500">
                            <p>Error al cargar el pedido.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-wrap gap-4 items-center text-sm">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <FiUser className="w-4 h-4" />
                                    <span>{order.usuario?.correo || 'Cliente no disponible'}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <FiCalendar className="w-4 h-4" />
                                    <span>{new Date(order.fechaPedido).toLocaleDateString('es-ES')}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <FiDollarSign className="w-4 h-4" />
                                    <span>{order.totalBob} BOB</span>
                                    {order.totalUsd && <span className="ml-1">/ {order.totalUsd} USD</span>}
                                </div>
                            </div>
                            {order.direccionEnvio && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                                    <FiMapPin className="w-4 h-4" />
                                    <span>{order.direccionEnvio.linea1}, {order.direccionEnvio.ciudad}, {order.direccionEnvio.departamento}</span>
                                </div>
                            )}
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Productos del pedido</h3>
                                {loadingItems ? (
                                    <div className="flex items-center py-4">
                                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                        <span className="ml-2">Cargando productos...</span>
                                    </div>
                                ) : items && items.length > 0 ? (
                                    <ul className="divide-y divide-border">
                                        {items.map(item => (
                                            <li key={item.id} className="py-2 flex items-center gap-4">
                                                <span className="font-medium flex-1">{item.producto?.nombre || 'Producto eliminado'}</span>
                                                <span className="text-xs text-muted-foreground">x{item.cantidad}</span>
                                                <span className="text-sm font-semibold text-primary">{item.precioUnitBob} BOB</span>
                                                {item.precioUnitUsd && <span className="text-xs text-muted-foreground">/ {item.precioUnitUsd} USD</span>}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-muted-foreground text-sm">No hay productos en este pedido.</div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
} 
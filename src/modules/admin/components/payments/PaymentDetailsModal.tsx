import { createPortal } from 'react-dom';
import { FiX, FiCreditCard, FiUser, FiCalendar, FiDollarSign, FiPackage } from 'react-icons/fi';
import { useGetPayment } from '../../hooks/payments/useGetPayment';
import type { PaymentDetailsModalProps } from '../../types/payments-components.type';

export default function PaymentDetailsModal({ isOpen, onClose, paymentId }: PaymentDetailsModalProps) {
    const { data: payment, isLoading, error } = useGetPayment({ id: paymentId || 0, enabled: isOpen && !!paymentId });

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative w-full max-w-2xl bg-background border border-border rounded-lg shadow-xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FiCreditCard className="w-5 h-5 text-primary" />
                        Detalles del Pago
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
                            <span className="ml-2">Cargando pago...</span>
                        </div>
                    ) : error || !payment ? (
                        <div className="text-center py-8 text-red-500">
                            <p>Error al cargar el pago.</p>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-wrap gap-4 items-center text-sm">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <FiUser className="w-4 h-4" />
                                    <span>{payment.pedido?.usuario?.correo || 'Cliente no disponible'}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <FiCalendar className="w-4 h-4" />
                                    <span>{new Date(payment.fechaPago).toLocaleDateString('es-ES')}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <FiDollarSign className="w-4 h-4" />
                                    <span>{payment.montoBob} BOB</span>
                                    {payment.montoUsd && <span className="ml-1">/ {payment.montoUsd} USD</span>}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-sm text-muted-foreground">Información del Pago</h3>
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-sm">ID del Pago:</span>
                                            <span className="font-medium">#{payment.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Método:</span>
                                            <span className="font-medium">{payment.metodo}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm">Estado:</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                                payment.estado === 'pendiente' ? 'text-yellow-600 bg-yellow-100' :
                                                payment.estado === 'confirmado' ? 'text-green-600 bg-green-100' :
                                                'text-red-600 bg-red-100'
                                            }`}>
                                                {payment.estado === 'pendiente' ? 'Pendiente' :
                                                payment.estado === 'confirmado' ? 'Confirmado' : 'Rechazado'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                {payment.pedido && (
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-sm text-muted-foreground flex items-center gap-1">
                                            <FiPackage className="w-4 h-4" />
                                            Información del Pedido
                                        </h3>
                                        <div className="space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-sm">ID del Pedido:</span>
                                                <span className="font-medium">#{payment.pedido.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">Total:</span>
                                                <span className="font-medium">{payment.pedido.totalBob} BOB</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm">Estado:</span>
                                                <span className="font-medium">{payment.pedido.estado}</span>
                                            </div>
                                        </div>
                                    </div>
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
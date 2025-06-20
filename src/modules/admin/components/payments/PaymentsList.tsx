import { useState } from 'react';
import { FiCreditCard, FiCalendar, FiUser, FiDollarSign } from 'react-icons/fi';
import type { PaymentsListProps } from '../../types/payments-components.type';
import ViewPaymentDetailsButton from './ViewPaymentDetailsButton';
import ConfirmPaymentButton from './ConfirmPaymentButton';
import RejectPaymentButton from './RejectPaymentButton';

const statusColors: Record<string, string> = {
    pendiente: 'text-yellow-600 bg-yellow-100',
    confirmado: 'text-green-600 bg-green-100',
    rechazado: 'text-red-600 bg-red-100',
};

const statusLabels: Record<string, string> = {
    pendiente: 'Pendiente',
    confirmado: 'Confirmado',
    rechazado: 'Rechazado',
};

export default function PaymentsList({ payments, loading, error, onPaymentUpdated }: PaymentsListProps) {
    const [selectedStatus, setSelectedStatus] = useState<'pendiente' | 'confirmado' | 'rechazado' | 'todos'>('todos');

    const filteredPayments = selectedStatus === 'todos'
        ? payments
        : payments.filter(payment => payment.estado === selectedStatus);

    if (loading) return (
        <div className="flex flex-col items-center py-16 animate-fade-in">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <span className="text-muted-foreground text-lg font-medium">Cargando pagos...</span>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-red-500">
            <FiCreditCard className="h-10 w-10 mb-2" />
            <span className="font-semibold">{error}</span>
        </div>
    );

    if (!payments.length) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-muted-foreground">
            <FiCreditCard className="h-10 w-10 mb-2" />
            <span className="font-semibold">No hay pagos registrados.</span>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Filtro de estados */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedStatus('todos')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'todos'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Todos ({payments.length})
                </button>
                <button
                    onClick={() => setSelectedStatus('pendiente')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'pendiente'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Pendientes ({payments.filter(p => p.estado === 'pendiente').length})
                </button>
                <button
                    onClick={() => setSelectedStatus('confirmado')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'confirmado'
                            ? 'bg-green-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Confirmados ({payments.filter(p => p.estado === 'confirmado').length})
                </button>
                <button
                    onClick={() => setSelectedStatus('rechazado')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'rechazado'
                            ? 'bg-red-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Rechazados ({payments.filter(p => p.estado === 'rechazado').length})
                </button>
            </div>

            {/* Lista de pagos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                {filteredPayments.map(payment => (
                    <div
                        key={payment.id}
                        className="relative group border border-primary/10 rounded-2xl shadow-xl p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <ViewPaymentDetailsButton paymentId={payment.id} />
                            <ConfirmPaymentButton paymentId={payment.id} currentStatus={payment.estado} onPaymentConfirmed={onPaymentUpdated} />
                            <RejectPaymentButton paymentId={payment.id} currentStatus={payment.estado} onPaymentRejected={onPaymentUpdated} />
                        </div>
                        <div className="flex items-center gap-3 w-full mb-2">
                            <div className="rounded-full p-2 border border-primary/20">
                                <FiCreditCard className="h-7 w-7 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-extrabold text-lg text-foreground tracking-tight">
                                    Pago #{payment.id}
                                </div>
                                <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${statusColors[payment.estado]}`}>
                                    {statusLabels[payment.estado]}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 items-center text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <FiUser className="w-4 h-4" />
                                <span>{payment.pedido?.usuario?.correo || 'Cliente no disponible'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <FiCalendar className="w-4 h-4" />
                                <span>{new Date(payment.fechaPago).toLocaleDateString('es-ES')}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center text-sm">
                            <div className="flex items-center gap-1 font-semibold text-primary">
                                <FiDollarSign className="w-4 h-4" />
                                <span>{payment.montoBob} BOB</span>
                            </div>
                            {payment.montoUsd && (
                                <span className="text-muted-foreground">/ {payment.montoUsd} USD</span>
                            )}
                            <span className="ml-auto text-muted-foreground">
                                {payment.metodo}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPayments.length === 0 && payments.length > 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <FiCreditCard className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay pagos con el estado seleccionado.</p>
                </div>
            )}
        </div>
    );
} 
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiRefreshCw } from 'react-icons/fi';
import type { ChangeStatusModalProps } from '../../types/orders-components.type';
import { OrderStatus } from '../../../core/enums/order-status.enum';
import { useUpdateOrder } from '../../hooks/orders/useUpdateOrder';

const statusOptions = [
    OrderStatus.PENDIENTE,
    OrderStatus.PAGADO,
    OrderStatus.ENVIADO,
    OrderStatus.CANCELADO,
];

const statusLabels: Record<string, string> = {
    pendiente: 'Pendiente',
    pagado: 'Pagado',
    enviado: 'Enviado',
    cancelado: 'Cancelado',
};

export default function ChangeStatusModal({
    isOpen,
    onClose,
    orderId,
    currentStatus,
    onStatusChanged
}: ChangeStatusModalProps) {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const updateMutation = useUpdateOrder({
        onSuccess: () => {
            onClose();
            onStatusChanged?.();
        }
    });

    if (!isOpen || !orderId) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedStatus === currentStatus) return;
        updateMutation.mutate({
            id: orderId,
            payload: { estado: selectedStatus }
        });
    };

    const modalContent = (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative w-full max-w-md bg-background border border-border rounded-lg shadow-xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FiRefreshCw className="w-5 h-5 text-primary" />
                        Cambiar estado del pedido
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" title="Cerrar">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Nuevo estado</label>
                        <div className="flex flex-col gap-2">
                            {statusOptions.map(status => (
                                <label key={status} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="order-status"
                                        value={status}
                                        checked={selectedStatus === status}
                                        onChange={() => setSelectedStatus(status)}
                                        disabled={updateMutation.isPending}
                                    />
                                    <span>{statusLabels[status]}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={selectedStatus === currentStatus || updateMutation.isPending}
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {updateMutation.isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            'Guardar cambios'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
} 
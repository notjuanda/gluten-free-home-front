import { createPortal } from 'react-dom';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import { useUpdatePayment } from '../../hooks/payments/useUpdatePayment';
import type { ConfirmPaymentModalProps } from '../../types/payments-components.type';

export default function ConfirmPaymentModal({ isOpen, onClose, paymentId, onPaymentConfirmed }: ConfirmPaymentModalProps) {
    const updateMutation = useUpdatePayment({
        onSuccess: () => {
            onClose();
            onPaymentConfirmed?.();
        }
    });
    if (!isOpen || !paymentId) return null;
    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation.mutate({ id: paymentId, payload: { estado: 'confirmado' } });
    };
    const modalContent = (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="relative w-full max-w-md bg-background border border-border rounded-lg shadow-xl overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <FiCheckCircle className="w-5 h-5 text-green-600" />
                        Confirmar pago
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors" title="Cerrar">
                        <FiX className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleConfirm} className="p-6 space-y-6">
                    <p>¿Estás seguro que deseas <span className="font-bold text-green-600">confirmar</span> este pago?</p>
                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {updateMutation.isPending ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Confirmando...
                            </>
                        ) : (
                            'Confirmar pago'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
} 
import { useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import type { RejectPaymentButtonProps } from '../../types/payments-components.type';
import RejectPaymentModal from './RejectPaymentModal';

export default function RejectPaymentButton({ paymentId, currentStatus, onPaymentRejected, className = '' }: RejectPaymentButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (currentStatus !== 'pendiente') return null;
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={`p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors ${className}`}
                title="Rechazar pago"
            >
                <FiXCircle className="w-4 h-4" />
            </button>
            <RejectPaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                paymentId={paymentId}
                onPaymentRejected={onPaymentRejected}
            />
        </>
    );
} 
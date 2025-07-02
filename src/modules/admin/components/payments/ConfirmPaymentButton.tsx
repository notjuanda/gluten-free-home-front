import { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import type { ConfirmPaymentButtonProps } from '../../types/payments-components.type';
import ConfirmPaymentModal from './ConfirmPaymentModal';

export default function ConfirmPaymentButton({ paymentId, currentStatus, onPaymentConfirmed, className = '' }: ConfirmPaymentButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    if (currentStatus !== 'pendiente') return null;
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={`p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors ${className}`}
                title="Confirmar pago"
            >
                <FiCheckCircle className="w-4 h-4" />
            </button>
            <ConfirmPaymentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                paymentId={paymentId}
                onPaymentConfirmed={onPaymentConfirmed}
            />
        </>
    );
} 
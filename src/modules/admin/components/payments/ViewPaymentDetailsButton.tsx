import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import type { ViewPaymentDetailsButtonProps } from '../../types/payments-components.type';
import PaymentDetailsModal from './PaymentDetailsModal';

export default function ViewPaymentDetailsButton({ paymentId, className = '' }: ViewPaymentDetailsButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={`p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors ${className}`}
                title="Ver detalles"
            >
                <FiEye className="w-4 h-4" />
            </button>

            <PaymentDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                paymentId={paymentId}
            />
        </>
    );
} 
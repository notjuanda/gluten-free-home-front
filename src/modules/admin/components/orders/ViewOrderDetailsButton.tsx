import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import type { ViewOrderDetailsButtonProps } from '../../types/orders-components.type';
import OrderDetailsModal from './OrderDetailsModal';

export default function ViewOrderDetailsButton({ 
    orderId, 
    className = "" 
}: ViewOrderDetailsButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                className={`p-2 rounded-full bg-background border border-border shadow hover:bg-primary/10 text-primary hover:text-primary-dark transition ${className}`}
                title="Ver detalles del pedido"
                onClick={handleOpen}
            >
                <FiEye className="w-4 h-4" />
            </button>

            <OrderDetailsModal
                isOpen={isModalOpen}
                onClose={handleClose}
                orderId={orderId}
            />
        </>
    );
} 
import { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import type { ChangeOrderStatusButtonProps } from '../../types/orders-components.type';
import ChangeStatusModal from './ChangeStatusModal';

export default function ChangeOrderStatusButton({
    orderId,
    currentStatus,
    onStatusChanged,
    className = ""
}: ChangeOrderStatusButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    return (
        <>
            <button
                className={`p-2 rounded-full bg-background border border-border shadow hover:bg-primary/10 text-primary hover:text-primary-dark transition ${className}`}
                title="Cambiar estado del pedido"
                onClick={handleOpen}
            >
                <FiRefreshCw className="w-4 h-4" />
            </button>
            <ChangeStatusModal
                isOpen={isModalOpen}
                onClose={handleClose}
                orderId={orderId}
                currentStatus={currentStatus}
                onStatusChanged={onStatusChanged}
            />
        </>
    );
} 
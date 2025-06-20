import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import UploadImageModal from './UploadImageModal';
import type { UploadImageButtonProps } from '../../types/products-components.type';

export default function UploadImageButton({ 
    productId, 
    productName, 
    className = "" 
}: UploadImageButtonProps) {
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
                title={`Subir imagen para ${productName}`}
                onClick={handleOpen}
            >
                <FiUpload className="w-4 h-4" />
            </button>

            <UploadImageModal
                isOpen={isModalOpen}
                onClose={handleClose}
                productId={productId}
                productName={productName}
            />
        </>
    );
} 
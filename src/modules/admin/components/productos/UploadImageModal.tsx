import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import UploadImageForm from './UploadImageForm';
import type { UploadImageModalProps } from '../../types/products-components.type';

export default function UploadImageModal({ 
    isOpen, 
    onClose, 
    productId, 
    productName 
}: UploadImageModalProps) {
    if (!isOpen) return null;

    const handleSuccess = () => {
        onClose();
    };

    const modalContent = (
        <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-2xl bg-background border border-border rounded-lg shadow-xl overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="text-xl font-semibold">Subir Imagen</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        title="Cerrar"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <UploadImageForm 
                        productId={productId}
                        productName={productName}
                        onSuccess={handleSuccess}
                    />
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
} 
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useDeleteProductImage } from '../../hooks/productos/useDeleteProductImage';
import DeleteImageConfirmDialog from './DeleteImageConfirmDialog';
import type { DeleteImageButtonProps } from '../../types/products-components.type';

export default function DeleteImageButton({ 
    image, 
    productId, 
    className = "" 
}: DeleteImageButtonProps) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const deleteMutation = useDeleteProductImage({
        productId,
        onSuccess: () => {
            setShowConfirmDialog(false);
        },
        onError: (error) => {
            console.error('Error al eliminar imagen:', error);
        }
    });

    const handleDelete = () => {
        setShowConfirmDialog(true);
    };

    const handleConfirm = () => {
        deleteMutation.mutate(image.id);
    };

    const handleCloseDialog = () => {
        setShowConfirmDialog(false);
    };

    return (
        <>
            <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className={`p-2 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors disabled:opacity-50 ${className}`}
                title="Eliminar imagen"
            >
                {deleteMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                    <FiTrash2 className="w-4 h-4" />
                )}
            </button>

            <DeleteImageConfirmDialog
                image={image}
                isOpen={showConfirmDialog}
                onClose={handleCloseDialog}
                onConfirm={handleConfirm}
                isLoading={deleteMutation.isPending}
            />
        </>
    );
} 
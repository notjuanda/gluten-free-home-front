import { FiAlertTriangle, FiX } from 'react-icons/fi';
import type { DeleteImageConfirmDialogProps } from '../../types/products-components.type';

export default function DeleteImageConfirmDialog({
    image,
    isOpen,
    onClose,
    onConfirm,
    isLoading = false
}: DeleteImageConfirmDialogProps) {
    if (!isOpen || !image) return null;

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Función para obtener la URL completa de la imagen
    const getImageUrl = (imageUrl: string) => {
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }
        return `${API_BASE_URL}${imageUrl}`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-red-100 text-red-600">
                        <FiAlertTriangle className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold">Confirmar Eliminación</h3>
                    <button
                        onClick={onClose}
                        className="ml-auto p-1 rounded-full hover:bg-muted transition-colors"
                        disabled={isLoading}
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-muted-foreground mb-4">
                        ¿Estás seguro de que quieres eliminar esta imagen? Esta acción no se puede deshacer.
                    </p>
                    
                    <div className="flex justify-center">
                        <img
                            src={getImageUrl(image.urlImagen)}
                            alt={image.textoAlt || 'Imagen a eliminar'}
                            className="max-w-full h-32 object-cover rounded-lg border border-border"
                        />
                    </div>
                    
                    {image.textoAlt && (
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                            "{image.textoAlt}"
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Eliminando...
                            </>
                        ) : (
                            'Eliminar'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
} 
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FiTrash2 } from 'react-icons/fi';
import { useDeleteBlogCategory } from '../../hooks/blog-categories/useDeleteBlogCategory';
import type { BlogCategoryDeleteButtonProps } from '../../types/blog-categories-components.type';

export default function BlogCategoryDeleteButton({ id, name, onDeleted }: BlogCategoryDeleteButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { deleteBlogCategory, loading, error } = useDeleteBlogCategory();

    const handleDelete = async () => {
        try {
            await deleteBlogCategory(id);
            onDeleted();
            setIsOpen(false);
        } catch (error) {
            console.error('Error deleting blog category:', error);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                title="Eliminar categoría"
            >
                <FiTrash2 className="w-4 h-4" />
                <span className="sr-only">Eliminar categoría</span>
            </button>

            {isOpen && createPortal(
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Eliminar categoría
                        </h3>
                        
                        <p className="text-gray-600 mb-6">
                            ¿Seguro que deseas eliminar la categoría "{name}"? Esta acción no se puede deshacer.
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                disabled={loading}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
} 
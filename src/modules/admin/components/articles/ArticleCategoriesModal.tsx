import { useState, useEffect } from 'react';
import { FiX, FiFolder } from 'react-icons/fi';
import { useGetBlogCategories } from '../../hooks/blog-categories/useGetBlogCategories';
import { useAssignCategories } from '../../hooks/articles/useAssignCategories';
import { getArticleCategories } from '@/modules/core/api/articles.api';
import type { BlogCategory } from '@/modules/core/types/blog-category.type';

interface ArticleCategoriesModalProps {
    isOpen: boolean;
    onClose: () => void;
    articleId: number;
    onUpdate?: () => void;
}

export default function ArticleCategoriesModal({ isOpen, onClose, articleId, onUpdate }: ArticleCategoriesModalProps) {
    const [selectedCategories, setSelectedCategories] = useState<BlogCategory[]>([]);
    const { categories: allCategories, loading: loadingCategories } = useGetBlogCategories();
    const { assignCategories, loading: loadingAssignCategories, error } = useAssignCategories();

    // Cargar categorías asignadas al artículo
    useEffect(() => {
        const loadArticleCategories = async () => {
            try {
                const articleCategories = await getArticleCategories(articleId);
                setSelectedCategories(articleCategories);
            } catch (error) {
                console.error('Error loading article categories:', error);
            }
        };

        if (isOpen && articleId) {
            loadArticleCategories();
        }
    }, [isOpen, articleId]);

    const handleAssignCategories = async (categoryIds: number[]) => {
        try {
            await assignCategories(articleId, { categoryIds });
            const updatedCategories = allCategories?.filter(cat => categoryIds.includes(cat.id)) || [];
            setSelectedCategories(updatedCategories);
            onUpdate?.();
        } catch (error) {
            console.error('Error assigning categories:', error);
        }
    };

    const toggleCategory = (category: BlogCategory) => {
        const isSelected = selectedCategories.some(c => c.id === category.id);
        if (isSelected) {
            const newCategories = selectedCategories.filter(c => c.id !== category.id);
            handleAssignCategories(newCategories.map(c => c.id));
        } else {
            const newCategories = [...selectedCategories, category];
            handleAssignCategories(newCategories.map(c => c.id));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 border border-orange/20">
                            <FiFolder className="h-5 w-5 text-orange" />
                        </div>
                        <h3 className="text-lg font-semibold">Gestionar Categorías del Artículo</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {loadingCategories ? (
                    <div className="text-center py-8">
                        <div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-sm text-gray-600">Cargando categorías disponibles...</p>
                    </div>
                ) : (
                    <>
                        {/* Categorías asignadas actualmente */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Categorías asignadas actualmente:</h4>
                            {selectedCategories.length === 0 ? (
                                <div className="text-center py-4 bg-gray-50 rounded-lg">
                                    <FiFolder className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">No hay categorías asignadas a este artículo</p>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {selectedCategories.map(category => (
                                        <span key={category.id} className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                                            {category.nombre}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Lista de categorías disponibles */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Seleccionar categorías:</h4>
                            {allCategories && allCategories.length > 0 ? (
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {allCategories.map(category => (
                                        <label key={category.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-200">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.some(c => c.id === category.id)}
                                                onChange={() => toggleCategory(category)}
                                                className="rounded text-orange focus:ring-orange"
                                            />
                                            <span className="text-sm font-medium">{category.nombre}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <FiFolder className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">No hay categorías disponibles</p>
                                    <p className="text-xs text-gray-400 mt-1">Crea categorías desde la página de gestión</p>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        )}

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
                                disabled={loadingAssignCategories}
                            >
                                Cerrar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 
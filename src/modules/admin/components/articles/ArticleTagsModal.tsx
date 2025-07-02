import { useState, useEffect } from 'react';
import { FiX, FiTag } from 'react-icons/fi';
import { useGetTags } from '../../hooks/tags/useGetTags';
import { useAssignTags } from '../../hooks/articles/useAssignTags';
import { getArticleTags } from '@/modules/core/api/articles.api';
import type { Tag } from '@/modules/core/types/tag.type';

interface ArticleTagsModalProps {
    isOpen: boolean;
    onClose: () => void;
    articleId: number;
    onUpdate?: () => void;
}

export default function ArticleTagsModal({ isOpen, onClose, articleId, onUpdate }: ArticleTagsModalProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const { tags: allTags, loading: loadingTags } = useGetTags();
    const { assignTags, loading: loadingAssignTags, error } = useAssignTags();

    // Cargar tags asignados al artículo
    useEffect(() => {
        const loadArticleTags = async () => {
            try {
                const articleTags = await getArticleTags(articleId);
                setSelectedTags(articleTags);
            } catch (error) {
                console.error('Error loading article tags:', error);
            }
        };

        if (isOpen && articleId) {
            loadArticleTags();
        }
    }, [isOpen, articleId]);

    const handleAssignTags = async (tagIds: number[]) => {
        try {
            await assignTags(articleId, { tagIds });
            const updatedTags = allTags?.filter(tag => tagIds.includes(tag.id)) || [];
            setSelectedTags(updatedTags);
            onUpdate?.();
        } catch (error) {
            console.error('Error assigning tags:', error);
        }
    };

    const toggleTag = (tag: Tag) => {
        const isSelected = selectedTags.some(t => t.id === tag.id);
        if (isSelected) {
            const newTags = selectedTags.filter(t => t.id !== tag.id);
            handleAssignTags(newTags.map(t => t.id));
        } else {
            const newTags = [...selectedTags, tag];
            handleAssignTags(newTags.map(t => t.id));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 border border-purple/20">
                            <FiTag className="h-5 w-5 text-purple" />
                        </div>
                        <h3 className="text-lg font-semibold">Gestionar Tags del Artículo</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FiX className="w-5 h-5" />
                    </button>
                </div>

                {loadingTags ? (
                    <div className="text-center py-8">
                        <div className="w-8 h-8 border-4 border-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-sm text-gray-600">Cargando tags disponibles...</p>
                    </div>
                ) : (
                    <>
                        {/* Tags asignados actualmente */}
                        <div className="mb-6">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Tags asignados actualmente:</h4>
                            {selectedTags.length === 0 ? (
                                <div className="text-center py-4 bg-gray-50 rounded-lg">
                                    <FiTag className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">No hay tags asignados a este artículo</p>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {selectedTags.map(tag => (
                                        <span key={tag.id} className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                                            {tag.nombre}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Lista de tags disponibles */}
                        <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-3">Seleccionar tags:</h4>
                            {allTags && allTags.length > 0 ? (
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {allTags.map(tag => (
                                        <label key={tag.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border border-gray-200">
                                            <input
                                                type="checkbox"
                                                checked={selectedTags.some(t => t.id === tag.id)}
                                                onChange={() => toggleTag(tag)}
                                                className="rounded text-purple focus:ring-purple"
                                            />
                                            <span className="text-sm font-medium">{tag.nombre}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <FiTag className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">No hay tags disponibles</p>
                                    <p className="text-xs text-gray-400 mt-1">Crea tags desde la página de gestión</p>
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
                                disabled={loadingAssignTags}
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
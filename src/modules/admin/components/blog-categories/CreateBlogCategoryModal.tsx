import { useState } from 'react';
import { FiX, FiFolder } from 'react-icons/fi';
import { useCreateBlogCategory } from '../../hooks/blog-categories/useCreateBlogCategory';
import type { CreateBlogCategoryModalProps } from '../../types/blog-categories-components.type';

export default function CreateBlogCategoryModal({ open, onClose, onCreated }: CreateBlogCategoryModalProps) {
    const [nombre, setNombre] = useState('');
    const [slug, setSlug] = useState('');
    const { createBlogCategory, loading, error } = useCreateBlogCategory();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createBlogCategory({ nombre, slug });
            onCreated?.();
            handleClose();
        } catch (error) {
            console.error('Error creating blog category:', error);
        }
    };

    const handleClose = () => {
        setNombre('');
        setSlug('');
        onClose();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full p-2 border border-primary/20">
                            <FiFolder className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Crear Nueva Categoría</h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 rounded-full hover:bg-muted transition"
                    >
                        <FiX className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            placeholder="Nombre de la categoría"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-foreground mb-2">
                            Slug
                        </label>
                        <input
                            type="text"
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition"
                            placeholder="slug-de-la-categoria"
                            required
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 border border-border rounded-xl hover:bg-muted transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition disabled:opacity-50"
                        >
                            {loading ? 'Creando...' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 
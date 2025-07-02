import { useGetCategories } from '../../hooks/categories/useGetCategories';
import { FiGrid, FiEdit2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import CategoryDeleteButton from './CategoryDeleteButton';
import EditCategoryModal from './EditCategoryModal';
import type { CategoriesListProps } from '../../types/categories-components.type';

export default function CategoriesList({ refreshTrigger }: CategoriesListProps) {
    const { categories, loading, error, refetch } = useGetCategories();
    const [editId, setEditId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (refreshTrigger !== undefined) {
            refetch();
        }
    }, [refreshTrigger, refetch]);

    const handleEdit = (id: number) => {
        setEditId(id);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setEditId(null);
    };

    if (loading) return (
        <div className="flex flex-col items-center py-16 animate-fade-in">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <span className="text-muted-foreground text-lg font-medium">Cargando categorías...</span>
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-red-500">
            <FiGrid className="h-10 w-10 mb-2" />
            <span className="font-semibold">Error: {error}</span>
        </div>
    );
    if (!categories?.length) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-muted-foreground">
            <FiGrid className="h-10 w-10 mb-2" />
            <span className="font-semibold">No hay categorías registradas.</span>
        </div>
    );

    return (
        <>
        <EditCategoryModal open={modalOpen} onClose={handleClose} categoryId={editId} onUpdated={refetch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {categories.map((cat) => (
                <div
                    key={cat.id}
                    className="relative group border border-primary/10 rounded-2xl shadow-xl p-6 flex flex-col items-start gap-3 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                            className="p-2 rounded-full bg-background border border-border shadow hover:bg-primary/10 text-primary hover:text-primary-dark transition"
                            title="Editar"
                            onClick={() => handleEdit(cat.id)}
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <CategoryDeleteButton id={cat.id} name={cat.nombre} onDeleted={refetch} />
                    </div>
                    <div className="flex items-center gap-3 w-full">
                        <div className="rounded-full p-2 border border-primary/20">
                            <FiGrid className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="font-extrabold text-lg text-foreground tracking-tight mb-1 truncate">{cat.nombre}</div>
                            <span className="inline-block border border-primary/20 text-primary px-2 py-0.5 rounded text-xs font-semibold bg-transparent">Slug: {cat.slug}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
} 
import { useGetIngredients } from '../../hooks/ingredients/useGetIngredients';
import { FiDroplet, FiEdit2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import IngredientDeleteButton from './IngredientDeleteButton';
import EditIngredientModal from './EditIngredientModal';
import type { IngredientsListProps } from '../../types/ingredients-components-type';

export default function IngredientsList({ refreshTrigger }: IngredientsListProps) {
    const { ingredients, loading, error, refetch } = useGetIngredients();
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
            <span className="text-muted-foreground text-lg font-medium">Cargando ingredientes...</span>
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-red-500">
            <FiDroplet className="h-10 w-10 mb-2" />
            <span className="font-semibold">Error: {error}</span>
        </div>
    );
    if (!ingredients?.length) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-muted-foreground">
            <FiDroplet className="h-10 w-10 mb-2" />
            <span className="font-semibold">No hay ingredientes registrados.</span>
        </div>
    );

    return (
        <>
        <EditIngredientModal open={modalOpen} onClose={handleClose} ingredientId={editId} onUpdated={refetch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {ingredients.map((ing) => (
                <div
                    key={ing.id}
                    className="relative group border border-primary/10 rounded-2xl shadow-xl p-6 flex flex-col items-start gap-3 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                            className="p-2 rounded-full bg-background border border-border shadow hover:bg-primary/10 text-primary hover:text-primary-dark transition"
                            title="Editar"
                            onClick={() => handleEdit(ing.id)}
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <IngredientDeleteButton id={ing.id} name={ing.nombre} onDeleted={refetch} />
                    </div>
                    <div className="flex items-center gap-3 w-full">
                        <div className="rounded-full p-2 border border-primary/20">
                            <FiDroplet className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="font-extrabold text-lg text-foreground tracking-tight mb-1 truncate">{ing.nombre}</div>
                            <span className="inline-block border border-primary/20 text-primary px-2 py-0.5 rounded text-xs font-semibold bg-transparent">ID: {ing.id}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
} 
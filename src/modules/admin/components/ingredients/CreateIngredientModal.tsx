import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIngredientSchema, type CreateIngredientSchema } from '../../schemas/create-ingredient.schema';
import { useCreateIngredient } from '../../hooks/ingredients/useCreateIngredient';
import { FiDroplet, FiX } from 'react-icons/fi';
import clsx from 'clsx';
import type { CreateIngredientModalProps } from '../../types/ingredients-components-type';

export default function CreateIngredientModal({ open, onClose, onCreated }: CreateIngredientModalProps) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateIngredientSchema>({
        resolver: zodResolver(createIngredientSchema),
    });
    const { createIngredient, loading, error } = useCreateIngredient();

    const onSubmit = async (data: CreateIngredientSchema) => {
        const created = await createIngredient(data);
        if (created) {
        reset();
        onCreated?.();
        onClose();
        }
    };

    return (
        <div className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center transition-all',
        open ? 'visible bg-black/40 backdrop-blur-sm' : 'invisible pointer-events-none')}
        >
        <div className={clsx(
            'relative w-full max-w-md mx-auto bg-white dark:bg-card rounded-2xl shadow-2xl p-8 transition-all scale-100',
            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8')}
        >
            <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition"><FiX size={22} /></button>
            <div className="flex items-center gap-3 mb-6">
            <FiDroplet className="h-7 w-7 text-primary" />
            <h2 className="font-extrabold text-xl text-foreground">Crear ingrediente</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block font-semibold mb-1">Nombre del ingrediente *</label>
                <input type="text" {...register('nombre')} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition" autoFocus />
                {errors.nombre && <span className="text-red-500 text-xs mt-1 block">{errors.nombre.message}</span>}
            </div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold rounded-lg py-2 mt-2 shadow hover:bg-primary/90 transition disabled:opacity-60">
                {loading ? 'Creando...' : 'Crear ingrediente'}
            </button>
            {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
            </form>
        </div>
        </div>
    );
} 
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { editBrandSchema, type EditBrandSchema } from '../../schemas/edit-brand.schema';
import { useGetBrand } from '../../hooks/brands/useGetBrand';
import { useUpdateBrand } from '../../hooks/brands/useUpdateBrand';
import { FiTag, FiX } from 'react-icons/fi';
import clsx from 'clsx';
import type { EditBrandModalProps } from '../../types/brands-components.type';

export default function EditBrandModal({ open, onClose, brandId, onUpdated }: EditBrandModalProps) {
    const { brand, loading: loadingBrand, error: errorBrand, refetch } = useGetBrand();
    const { update, loading, error } = useUpdateBrand();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<EditBrandSchema>({
        resolver: zodResolver(editBrandSchema),
    });

    useEffect(() => {
        if (open && brandId) {
        refetch(brandId);
        }
    }, [open, brandId, refetch]);

    useEffect(() => {
        if (brand) {
        setValue('nombre', brand.nombre);
        }
    }, [brand, setValue]);

    const onSubmit = async (data: EditBrandSchema) => {
        if (!brandId) return;
        const updated = await update(brandId, data);
        if (updated) {
        reset();
        onUpdated?.();
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
            <FiTag className="h-7 w-7 text-primary" />
            <h2 className="font-extrabold text-xl text-foreground">Editar marca</h2>
            </div>
            {loadingBrand ? (
            <div className="text-center py-8">Cargando...</div>
            ) : errorBrand ? (
            <div className="text-red-500 text-center py-8">{errorBrand}</div>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                <label className="block font-semibold mb-1">Nombre de la marca *</label>
                <input type="text" {...register('nombre')} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition" autoFocus />
                {errors.nombre && <span className="text-red-500 text-xs mt-1 block">{errors.nombre.message}</span>}
                </div>
                <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold rounded-lg py-2 mt-2 shadow hover:bg-primary/90 transition disabled:opacity-60">
                {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
                {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
            </form>
            )}
        </div>
        </div>
    );
} 
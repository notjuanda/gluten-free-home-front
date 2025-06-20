import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema, type CreateProductSchema } from '../../schemas/product.schema';
import { ActionButton } from '@/shared/ui/ActionButton';
import { useCreateProduct } from '../../hooks/productos/useCreateProduct';
import { useGetBrands } from '../../hooks/brands/useGetBrands';
import { useGetCategories } from '../../hooks/categories/useGetCategories';
import { useGetIngredients } from '../../hooks/ingredients/useGetIngredients';
import type { ProductFormProps } from '../../types/products-components.type';

export default function ProductForm({ onSubmit }: ProductFormProps) {
    const { register, handleSubmit, formState: { errors }, control } = useForm<CreateProductSchema>({
        resolver: zodResolver(createProductSchema),
    });
    const { createProduct, loading, error } = useCreateProduct();
    const { brands } = useGetBrands();
    const { categories } = useGetCategories();
    const { ingredients } = useGetIngredients();

    const handleFormSubmit = async (data: CreateProductSchema) => {
        const created = await createProduct(data);
        if (created && onSubmit) onSubmit(data);
    };

    return (
        <form className="max-w-2xl mx-auto bg-card rounded-2xl shadow-lg p-8 space-y-10 border border-border animate-fade-in" autoComplete="off">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block font-bold text-foreground mb-2">Nombre *</label>
                    <input type="text" {...register('nombre')} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                    {errors.nombre && <span className="text-red-500 text-xs mt-1 block">{errors.nombre.message}</span>}
                </div>
                <div>
                    <label className="block font-bold text-foreground mb-2">Slug *</label>
                    <input type="text" {...register('slug')} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                    {errors.slug && <span className="text-red-500 text-xs mt-1 block">{errors.slug.message}</span>}
                </div>
                <div className="md:col-span-2">
                    <label className="block font-bold text-foreground mb-2">Descripción</label>
                    <textarea {...register('descripcion')} className="w-full rounded-lg border border-input bg-background px-4 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                    {errors.descripcion && <span className="text-red-500 text-xs mt-1 block">{errors.descripcion.message}</span>}
                </div>
                <div>
                    <label className="block font-bold text-foreground mb-2">Precio (BOB) *</label>
                    <input type="number" step="0.01" {...register('precioBob', { valueAsNumber: true })} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                    {errors.precioBob && <span className="text-red-500 text-xs mt-1 block">{errors.precioBob.message}</span>}
                </div>
                <div>
                    <label className="block font-bold text-foreground mb-2">Precio (USD)</label>
                    <input type="number" step="0.01" {...register('precioUsd', { setValueAs: v => v === '' ? undefined : Number(v) })} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                    {errors.precioUsd && <span className="text-red-500 text-xs mt-1 block">{errors.precioUsd.message}</span>}
                </div>
                <div>
                    <label className="block font-bold text-foreground mb-2">Stock</label>
                    <input type="number" {...register('stock', { setValueAs: v => v === '' ? undefined : Number(v) })} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                    {errors.stock && <span className="text-red-500 text-xs mt-1 block">{errors.stock.message}</span>}
                </div>
                <div>
                    <label className="block font-bold text-foreground mb-2">Marca</label>
                    <select {...register('marcaId', { setValueAs: v => v === '' ? undefined : Number(v) })} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition">
                        <option value="">Sin marca</option>
                        {brands?.map((brand) => (
                            <option key={brand.id} value={brand.id}>{brand.nombre}</option>
                        ))}
                    </select>
                    {errors.marcaId && <span className="text-red-500 text-xs mt-1 block">{errors.marcaId.message}</span>}
                </div>
                <div>
                    <label className="block font-bold text-foreground mb-2">Categoría *</label>
                    <select {...register('categoriaId', { valueAsNumber: true })} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition">
                        <option value="">Selecciona una categoría</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                    {errors.categoriaId && <span className="text-red-500 text-xs mt-1 block">{errors.categoriaId.message}</span>}
                </div>
                <div className="md:col-span-2">
                    <label className="block font-bold text-foreground mb-2">Ingredientes</label>
                    <Controller
                        name="ingredientesIds"
                        control={control}
                        render={({ field }) => (
                            <select
                                multiple
                                className="w-full rounded-lg border border-input bg-background px-4 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
                                value={field.value ? field.value.map(String) : []}
                                onChange={e => {
                                    const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
                                    field.onChange(selected);
                                }}
                            >
                                {ingredients?.map((ing) => (
                                    <option key={ing.id} value={ing.id}>{ing.nombre}</option>
                                ))}
                            </select>
                        )}
                    />
                    <span className="text-xs text-muted-foreground block mt-1">Mantén Ctrl (Windows) o Cmd (Mac) para seleccionar varios.</span>
                    {errors.ingredientesIds && <span className="text-red-500 text-xs mt-1 block">{errors.ingredientesIds.message}</span>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register('activo')} id="activo" className="accent-primary scale-125" />
                    <label htmlFor="activo" className="font-semibold text-foreground">Activo</label>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" {...register('certificadoSinGluten')} id="certificadoSinGluten" className="accent-primary scale-125" />
                    <label htmlFor="certificadoSinGluten" className="font-semibold text-foreground">Certificado sin gluten</label>
                </div>
            </div>
            <div>
                <label className="block font-bold text-foreground mb-2">URL Certificado</label>
                <input type="text" {...register('urlCertificado')} className="w-full rounded-lg border border-input bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/60 transition" />
                {errors.urlCertificado && <span className="text-red-500 text-xs mt-1 block">{errors.urlCertificado.message}</span>}
            </div>
            <ActionButton
                variant="primary"
                loading={loading}
                onClick={handleSubmit(handleFormSubmit)}
                className="w-full md:w-auto mt-4"
            >
                Crear producto
            </ActionButton>
            {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
        </form>
    );
} 
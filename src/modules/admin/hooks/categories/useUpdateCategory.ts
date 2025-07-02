import { useState } from 'react';
import { updateProductCategory } from '@/modules/core/api/product-category.api';
import type { UpdateProductCategoryInput, ProductCategory } from '@/modules/core/types/product-category.type';

export function useUpdateCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function updateCategory(id: number, data: UpdateProductCategoryInput): Promise<ProductCategory | null> {
        setLoading(true);
        setError(null);
        try {
        const category = await updateProductCategory(id, data);
        return category;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error al actualizar la categoria');
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { updateCategory, loading, error };
} 
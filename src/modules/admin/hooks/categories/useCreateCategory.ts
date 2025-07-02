import { useState } from 'react';
import { createProductCategory } from '@/modules/core/api/product-category.api';
import type { CreateProductCategoryInput, ProductCategory } from '@/modules/core/types/product-category.type';

export function useCreateCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function createCategoryAction(data: CreateProductCategoryInput): Promise<ProductCategory | null> {
        setLoading(true);
        try {
            const category = await createProductCategory(data);
            setError(null);
            return category;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error desconocido');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { createCategory: createCategoryAction, loading, error };
} 
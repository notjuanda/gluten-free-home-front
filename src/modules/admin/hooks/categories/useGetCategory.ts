import { useState, useCallback } from 'react';
import { getProductCategory } from '@/modules/core/api/product-category.api';
import type { ProductCategory } from '@/modules/core/types/product-category.type';

export function useGetCategory() {
    const [category, setCategory] = useState<ProductCategory | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCategory = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
        const data = await getProductCategory(id);
        setCategory(data);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error al obtener la categoria');
        } finally {
        setLoading(false);
        }
    }, []);

    return { category, loading, error, refetch: fetchCategory };
} 
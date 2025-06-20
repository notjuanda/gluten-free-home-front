import { useEffect, useState, useCallback } from 'react';
import { getProductCategories } from '@/modules/core/api/product-category.api';
import type { ProductCategory } from '@/modules/core/types/product-category.type';

export function useGetCategories() {
    const [categories, setCategories] = useState<ProductCategory[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(() => {
        setLoading(true);
        getProductCategories()
            .then((data) => {
                setCategories(data);
                setError(null);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return { categories, loading, error, refetch: fetchCategories };
} 
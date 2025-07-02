import { useEffect, useState } from 'react';
import { getBlogCategories } from '@/modules/core/api/blog-category.api';
import type { BlogCategory } from '@/modules/core/types/blog-category.type';

export function useClientCategories() {
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getBlogCategories()
            .then(setCategories)
            .catch(() => setError('Error al cargar categorías'))
            .finally(() => setLoading(false));
    }, []);

    return { categories, loading, error };
} 
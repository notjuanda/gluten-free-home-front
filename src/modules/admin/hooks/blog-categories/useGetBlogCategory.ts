import { useEffect, useState, useCallback } from 'react';
import { getBlogCategory } from '@/modules/core/api/blog-category.api';
import type { BlogCategory } from '@/modules/core/types/blog-category.type';

export function useGetBlogCategory(id: number) {
    const [category, setCategory] = useState<BlogCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategory = useCallback(() => {
        if (!id) return;
        setLoading(true);
        getBlogCategory(id)
            .then((data) => {
                setCategory(data);
                setError(null);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    return { category, loading, error, refetch: fetchCategory };
} 
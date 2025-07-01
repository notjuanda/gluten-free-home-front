import { useEffect, useState, useCallback } from 'react';
import { getBlogCategories } from '@/modules/core/api/blog-category.api';
import type { BlogCategory } from '@/modules/core/types/blog-category.type';

export function useGetBlogCategories() {
    const [categories, setCategories] = useState<BlogCategory[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(() => {
        setLoading(true);
        getBlogCategories()
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
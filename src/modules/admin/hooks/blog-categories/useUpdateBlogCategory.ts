import { useState, useCallback } from 'react';
import { updateBlogCategory } from '@/modules/core/api/blog-category.api';
import type { UpdateBlogCategoryInput } from '@/modules/core/types/blog-category.type';

export function useUpdateBlogCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateBlogCategoryMutation = useCallback(async (id: number, payload: UpdateBlogCategoryInput) => {
        setLoading(true);
        setError(null);
        try {
            const result = await updateBlogCategory(id, payload);
            return result;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { updateBlogCategory: updateBlogCategoryMutation, loading, error };
} 
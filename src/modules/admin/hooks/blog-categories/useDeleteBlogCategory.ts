import { useState, useCallback } from 'react';
import { deleteBlogCategory } from '@/modules/core/api/blog-category.api';

export function useDeleteBlogCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteBlogCategoryMutation = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteBlogCategory(id);
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { deleteBlogCategory: deleteBlogCategoryMutation, loading, error };
} 
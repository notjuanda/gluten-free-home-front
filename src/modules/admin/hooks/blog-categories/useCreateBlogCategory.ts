import { useState, useCallback } from 'react';
import { createBlogCategory } from '@/modules/core/api/blog-category.api';
import type { CreateBlogCategoryInput } from '@/modules/core/types/blog-category.type';

export function useCreateBlogCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createBlogCategoryMutation = useCallback(async (payload: CreateBlogCategoryInput) => {
        setLoading(true);
        setError(null);
        try {
            const result = await createBlogCategory(payload);
            return result;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { createBlogCategory: createBlogCategoryMutation, loading, error };
} 
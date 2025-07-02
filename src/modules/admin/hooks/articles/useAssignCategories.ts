import { useState, useCallback } from 'react';
import { assignCategoriesToArticle } from '@/modules/core/api/articles.api';
import type { AssignCategoriesInput } from '@/modules/core/types/article.type';

export function useAssignCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const assignCategories = useCallback(async (articleId: number, payload: AssignCategoriesInput) => {
        setLoading(true);
        setError(null);
        try {
            const result = await assignCategoriesToArticle(articleId, payload);
            return result;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { assignCategories, loading, error };
} 
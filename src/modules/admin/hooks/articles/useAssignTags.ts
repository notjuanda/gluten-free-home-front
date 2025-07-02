import { useState, useCallback } from 'react';
import { assignTagsToArticle } from '@/modules/core/api/articles.api';
import type { AssignTagsInput } from '@/modules/core/types/article.type';

export function useAssignTags() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const assignTags = useCallback(async (articleId: number, payload: AssignTagsInput) => {
        setLoading(true);
        setError(null);
        try {
            const result = await assignTagsToArticle(articleId, payload);
            return result;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { assignTags, loading, error };
} 
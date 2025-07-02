import { useState, useCallback } from 'react';
import { createTag } from '@/modules/core/api/tags.api';
import type { CreateTagInput } from '@/modules/core/types/tag.type';

export function useCreateTag() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTagMutation = useCallback(async (payload: CreateTagInput) => {
        setLoading(true);
        setError(null);
        try {
            const result = await createTag(payload);
            return result;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { createTag: createTagMutation, loading, error };
} 
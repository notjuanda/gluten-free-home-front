import { useState, useCallback } from 'react';
import { updateTag } from '@/modules/core/api/tags.api';
import type { UpdateTagInput } from '@/modules/core/types/tag.type';

export function useUpdateTag() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateTagMutation = useCallback(async (id: number, payload: UpdateTagInput) => {
        setLoading(true);
        setError(null);
        try {
            const result = await updateTag(id, payload);
            return result;
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { updateTag: updateTagMutation, loading, error };
} 
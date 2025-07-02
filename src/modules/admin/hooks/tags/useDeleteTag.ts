import { useState, useCallback } from 'react';
import { deleteTag } from '@/modules/core/api/tags.api';

export function useDeleteTag() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteTagMutation = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteTag(id);
        } catch (e: any) {
            setError(e.message);
            throw e;
        } finally {
            setLoading(false);
        }
    }, []);

    return { deleteTag: deleteTagMutation, loading, error };
} 
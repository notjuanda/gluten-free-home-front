import { useEffect, useState, useCallback } from 'react';
import { getTag } from '@/modules/core/api/tags.api';
import type { Tag } from '@/modules/core/types/tag.type';

export function useGetTag(id: number) {
    const [tag, setTag] = useState<Tag | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTag = useCallback(() => {
        if (!id) return;
        setLoading(true);
        getTag(id)
            .then((data) => {
                setTag(data);
                setError(null);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchTag();
    }, [fetchTag]);

    return { tag, loading, error, refetch: fetchTag };
} 
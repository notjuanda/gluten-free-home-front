import { useEffect, useState, useCallback } from 'react';
import { getTags } from '@/modules/core/api/tags.api';
import type { Tag } from '@/modules/core/types/tag.type';

export function useGetTags() {
    const [tags, setTags] = useState<Tag[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTags = useCallback(() => {
        setLoading(true);
        getTags()
            .then((data) => {
                setTags(data);
                setError(null);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

    return { tags, loading, error, refetch: fetchTags };
} 
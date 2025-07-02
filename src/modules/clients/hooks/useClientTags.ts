import { useEffect, useState } from 'react';
import { getTags } from '@/modules/core/api/tags.api';
import type { Tag } from '@/modules/core/types/tag.type';

export function useClientTags() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getTags()
            .then(setTags)
            .catch(() => setError('Error al cargar tags'))
            .finally(() => setLoading(false));
    }, []);

    return { tags, loading, error };
} 
import { useEffect, useState } from 'react';
import { getArticles } from '@/modules/core/api/articles.api';
import type { Article } from '@/modules/core/types/article.type';

export function useClientArticles() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getArticles()
            .then(setArticles)
            .catch(() => setError('Error al cargar artículos'))
            .finally(() => setLoading(false));
    }, []);

    return { articles, loading, error };
} 
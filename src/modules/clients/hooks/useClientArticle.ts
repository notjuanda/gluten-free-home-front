import { useEffect, useState } from 'react';
import { getArticleBySlug } from '@/modules/core/api/articles.api';
import type { Article } from '@/modules/core/types/article.type';

export function useClientArticle(slug: string) {
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        getArticleBySlug(slug)
        .then(setArticle)
        .catch(() => setError('Error al cargar el artículo'))
        .finally(() => setLoading(false));
    }, [slug]);

    return { article, loading, error };
} 
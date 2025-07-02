import { useEffect, useState } from 'react';
import { getCommentsByArticle } from '@/modules/core/api/comments.api';
import type { Comment } from '@/modules/core/types/comment.type';

export function useClientComments(articleId: number) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!articleId) return;
        setLoading(true);
        getCommentsByArticle(articleId)
            .then(setComments)
            .catch(() => setError('Error al cargar comentarios'))
            .finally(() => setLoading(false));
    }, [articleId]);

    return { comments, loading, error };
} 
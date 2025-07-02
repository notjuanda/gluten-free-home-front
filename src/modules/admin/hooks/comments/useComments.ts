import { useEffect, useState } from 'react';
import { getComments } from '@/modules/core/api/comments.api';
import type { Comment } from '@/modules/core/types/comment.type';

export function useComments() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComments = async () => {
        setLoading(true);
        setError(null);
        try {
        const data = await getComments();
        setComments(data);
        } catch (err: any) {
        setError(err.message || 'Error al cargar comentarios');
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return { comments, loading, error, refetch: fetchComments };
} 
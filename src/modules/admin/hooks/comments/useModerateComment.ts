import { useState } from 'react';
import { moderateComment } from '@/modules/core/api/comments.api';
import type { ModerateCommentInput, Comment } from '@/modules/core/types/comment.type';

export function useModerateComment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const moderate = async (id: number, input: ModerateCommentInput): Promise<Comment | null> => {
        setLoading(true);
        setError(null);
        try {
        const updated = await moderateComment(id, input);
        return updated;
        } catch (err: any) {
        setError(err.message || 'Error al moderar comentario');
        return null;
        } finally {
        setLoading(false);
        }
    };

    return { moderate, loading, error };
} 
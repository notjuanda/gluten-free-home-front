import { useState } from 'react';
import { createComment } from '@/modules/core/api/comments.api';

export function useCreateComment(articleId: number) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    async function handleCreateComment(contenido: string) {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
        await createComment({ articuloId: articleId, contenido });
        setSuccess(true);
        } catch (e) {
        setError('Error al enviar el comentario');
        } finally {
        setLoading(false);
        }
    }

    return { createComment: handleCreateComment, loading, error, success };
} 
import React, { useState } from 'react';
import { useAuth } from '@/modules/core/hooks/useAuth';
import { useCreateComment } from '../hooks/useCreateComment';

interface Props {
    articleId: number;
}

const BlogCommentForm: React.FC<Props> = ({ articleId }) => {
    const { isAuthenticated } = useAuth();
    const { createComment, loading, error, success } = useCreateComment(articleId);
    const [contenido, setContenido] = useState('');

    if (!isAuthenticated) {
        return <div className="text-gray-500 text-sm">Inicia sesión para comentar.</div>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!contenido.trim()) return;
        await createComment(contenido);
        setContenido('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
            className="w-full border rounded p-2 text-sm min-h-[60px]"
            placeholder="Escribe tu comentario..."
            value={contenido}
            onChange={e => setContenido(e.target.value)}
            disabled={loading}
            maxLength={500}
            required
        />
        <div className="flex items-center gap-2">
            <button
            type="submit"
            className="bg-primary text-white px-4 py-1 rounded disabled:opacity-60"
            disabled={loading || !contenido.trim()}
            >
            {loading ? 'Enviando...' : 'Comentar'}
            </button>
            {success && <span className="text-green-600 text-xs">¡Comentario enviado!</span>}
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
        </form>
    );
};

export default BlogCommentForm; 
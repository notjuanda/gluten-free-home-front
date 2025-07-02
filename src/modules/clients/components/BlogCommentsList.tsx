import React from 'react';
import { useClientComments } from '../hooks/useClientComments';

interface Props {
    articleId: number;
}

const getInitial = (name?: string) => name?.charAt(0).toUpperCase() || 'A';

const BlogCommentsList: React.FC<Props> = ({ articleId }) => {
    const { comments, loading, error } = useClientComments(articleId);

    if (loading) return <div className="text-gray-500">Cargando comentarios...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!comments.length) return <div className="text-gray-400">No hay comentarios aún.</div>;

    return (
        <ul className="space-y-6">
        {comments.map(comment => (
            <li key={comment.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                {getInitial(comment.usuario?.nombreCompleto || comment.usuario?.nombreUsuario)}
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-primary">{comment.usuario?.nombreCompleto || comment.usuario?.nombreUsuario || 'Anónimo'}</span>
                    <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="text-gray-700 text-sm whitespace-pre-line">{comment.contenido}</div>
            </div>
            </li>
        ))}
        </ul>
    );
};

export default BlogCommentsList; 
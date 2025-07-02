import React, { useState } from 'react';
import { useComments } from '@/modules/admin/hooks/comments/useComments';
import { useModerateComment } from '@/modules/admin/hooks/comments/useModerateComment';
import { CommentStatus } from '@/modules/core/enums/comment-status.enum';

const STATUS_LABELS: Record<string, string> = {
    [CommentStatus.VISIBLE]: 'Visible',
    [CommentStatus.OCULTO]: 'Oculto',
    [CommentStatus.PENDIENTE]: 'Pendiente',
};

const STATUS_COLORS: Record<string, string> = {
    [CommentStatus.VISIBLE]: 'bg-green-100 text-green-800',
    [CommentStatus.OCULTO]: 'bg-gray-200 text-gray-700',
    [CommentStatus.PENDIENTE]: 'bg-yellow-100 text-yellow-800',
};

export const AdminCommentsList: React.FC = () => {
    const { comments, loading, error, refetch } = useComments();
    const { moderate, loading: loadingModerate } = useModerateComment();
    const [selected, setSelected] = useState<{ [id: number]: string }>({});
    const [success, setSuccess] = useState<{ [id: number]: boolean }>({});

    const handleChange = (id: number, value: string) => {
        setSelected((prev) => ({ ...prev, [id]: value }));
    };

    const handleModerate = async (id: number) => {
        const estado = selected[id];
        if (!estado) return;
        const result = await moderate(id, { estado: estado as any });
        if (result) {
        setSuccess((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => setSuccess((prev) => ({ ...prev, [id]: false })), 1000);
        refetch();
        }
    };

    if (loading) return <div className="py-8 text-center text-gray-500">Cargando comentarios...</div>;
    if (error) return <div className="py-8 text-center text-red-500">{error}</div>;
    if (!comments.length) return <div className="py-8 text-center text-gray-400">No hay comentarios registrados.</div>;

    return (
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow">
            <thead>
            <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Artículo</th>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Contenido</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {comments.map((comment) => (
                <tr key={comment.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">{comment.id}</td>
                <td className="px-4 py-2 text-sm max-w-xs truncate">
                    {comment.articulo?.titulo || 'Sin artículo'}
                </td>
                <td className="px-4 py-2 text-sm max-w-xs truncate">
                    {comment.usuario?.nombreCompleto || comment.usuario?.nombreUsuario || 'Anónimo'}
                </td>
                <td className="px-4 py-2 text-sm max-w-md truncate">
                    {comment.contenido}
                </td>
                <td className="px-4 py-2 text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[comment.estado]}`}>{STATUS_LABELS[comment.estado]}</span>
                </td>
                <td className="px-4 py-2 text-sm">
                    <select
                    className="border rounded px-2 py-1 text-sm mr-2"
                    value={selected[comment.id] || comment.estado}
                    onChange={(e) => handleChange(comment.id, e.target.value)}
                    disabled={loadingModerate}
                    >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                        <option key={value} value={value} disabled={value === comment.estado}>
                        {label}
                        </option>
                    ))}
                    </select>
                    <button
                    className="px-3 py-1 rounded bg-primary text-white text-xs hover:bg-primary-dark disabled:opacity-60"
                    onClick={() => handleModerate(comment.id)}
                    disabled={loadingModerate || (selected[comment.id] || comment.estado) === comment.estado}
                    >
                    {success[comment.id] ? '¡Listo!' : 'Guardar'}
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}; 
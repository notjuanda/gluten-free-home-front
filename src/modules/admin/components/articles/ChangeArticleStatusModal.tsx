import React, { useState } from "react";
import { PublicationStatus } from "@/modules/core/enums/publication-status.enum";
import { useUpdateArticle } from "@/modules/admin/hooks/articles/useUpdateArticle";

interface ChangeArticleStatusModalProps {
    articleId: number;
    currentStatus: PublicationStatus;
    isOpen: boolean;
    onClose: () => void;
    onStatusChanged: (newStatus: PublicationStatus) => void;
}

const STATUS_LABELS: Record<PublicationStatus, string> = {
    [PublicationStatus.BORRADOR]: "Borrador",
    [PublicationStatus.PENDIENTE_REVISION]: "Pendiente de revisión",
    [PublicationStatus.PUBLICADO]: "Publicado",
};

export const ChangeArticleStatusModal: React.FC<ChangeArticleStatusModalProps> = ({
    articleId,
    currentStatus,
    isOpen,
    onClose,
    onStatusChanged,
}) => {
    const [selected, setSelected] = useState<PublicationStatus>(currentStatus);
    const { update, loading, error } = useUpdateArticle();
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value as PublicationStatus);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selected === currentStatus) return onClose();
        const result = await update(articleId, { estadoPublicacion: selected });
        if (result) {
        setSuccess(true);
        onStatusChanged(selected);
        setTimeout(() => {
            setSuccess(false);
            onClose();
        }, 800);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fade-in">
            <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
            onClick={onClose}
            disabled={loading}
            >
            ×
            </button>
            <h2 className="text-xl font-bold mb-4">Cambiar estado del artículo</h2>
            <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium">Estado actual:</label>
            <div className="mb-4">
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                {STATUS_LABELS[currentStatus] || currentStatus}
                </span>
            </div>
            <label className="block mb-2 font-medium">Nuevo estado:</label>
            <select
                className="w-full border rounded-lg px-3 py-2 mb-4"
                value={selected}
                onChange={handleChange}
                disabled={loading}
            >
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value} disabled={value === currentStatus}>
                    {label}
                </option>
                ))}
            </select>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {success && <div className="text-green-600 mb-2">¡Estado actualizado!</div>}
            <div className="flex justify-end gap-2">
                <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={onClose}
                disabled={loading}
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark disabled:opacity-60"
                disabled={loading || selected === currentStatus}
                >
                {loading ? "Guardando..." : "Cambiar estado"}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
}; 
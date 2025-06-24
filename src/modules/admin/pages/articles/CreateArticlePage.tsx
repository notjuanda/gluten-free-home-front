import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateArticleInput } from "@/modules/core/types/article.type";
import { PublicationStatus } from "@/modules/core/enums/publication-status.enum";
import { useCreateArticle } from "@/modules/admin/hooks/articles/useCreateArticle";
import ArticleTiptapEditor from "@/modules/admin/components/articles/ArticleTiptapEditor";
import type { JSONContent } from "@tiptap/react";

const estados = [
    { value: PublicationStatus.BORRADOR, label: "Borrador" },
    { value: PublicationStatus.PENDIENTE_REVISION, label: "Pendiente de revisión" },
    { value: PublicationStatus.PUBLICADO, label: "Publicado" },
];

// Transforma el JSON de Tiptap a ArticleBlock[]
function tiptapToArticleBlocks(json: JSONContent): any[] {
    if (!json || !Array.isArray(json.content)) return [];
    return json.content.map((block: any, idx: number) => ({
        id: `${Date.now()}-${idx}`,
        type: block.type,
        data: block,
        order: idx + 1,
    }));
}

const CreateArticlePage: React.FC = () => {
    const navigate = useNavigate();
    const { create, loading, error } = useCreateArticle();
    const [form, setForm] = useState<Partial<CreateArticleInput>>({
        titulo: "",
        slug: "",
        resumen: "",
        estadoPublicacion: PublicationStatus.BORRADOR,
    });
    const [editorContent, setEditorContent] = useState<JSONContent | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleContentChange = (content: JSONContent) => {
        setEditorContent(content);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const blocks = tiptapToArticleBlocks(editorContent || {});
        const result = await create({
            ...form,
            contenidoBloques: blocks,
        } as CreateArticleInput);
        if (result) {
            navigate("/admin/articulos");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Crear artículo</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Título</label>
                    <input
                        type="text"
                        name="titulo"
                        value={form.titulo}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Resumen</label>
                    <textarea
                        name="resumen"
                        value={form.resumen}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        rows={2}
                    />
                </div>
                <div>
                    <label className="block font-medium">Estado de publicación</label>
                    <select
                        name="estadoPublicacion"
                        value={form.estadoPublicacion}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        {estados.map((op) => (
                            <option key={op.value} value={op.value}>{op.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1">Contenido</label>
                    <ArticleTiptapEditor value={editorContent || {}} onChange={handleContentChange} />
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Creando..." : "Crear artículo"}
                </button>
            </form>
        </div>
    );
};

export default CreateArticlePage; 
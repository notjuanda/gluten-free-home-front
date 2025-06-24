import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { UpdateArticleInput } from "@/modules/core/types/article.type";
import { PublicationStatus } from "@/modules/core/enums/publication-status.enum";
import { useGetArticle } from "@/modules/admin/hooks/articles/useGetArticle";
import { useUpdateArticle } from "@/modules/admin/hooks/articles/useUpdateArticle";
import ArticleTiptapEditor from "@/modules/admin/components/articles/ArticleTiptapEditor";
import type { JSONContent } from "@tiptap/react";

const estados = [
    { value: PublicationStatus.BORRADOR, label: "Borrador" },
    { value: PublicationStatus.PENDIENTE_REVISION, label: "Pendiente de revisión" },
    { value: PublicationStatus.PUBLICADO, label: "Publicado" },
];

function articleBlocksToTiptap(blocks: any[]): JSONContent {
    const content = blocks
        ?.map((block: any) => block.data)
        .filter((node: any) => !!node);

    return {
        type: 'doc',
        content: content.length > 0 ? content : [
            { type: 'paragraph', content: [{ type: 'text', text: '' }] }
        ],
    };
}

function tiptapToArticleBlocks(json: JSONContent): any[] {
    if (!json || !Array.isArray(json.content)) return [];
    return json.content.map((block: any, idx: number) => ({
        id: `${Date.now()}-${idx}`,
        type: block.type,
        data: block,
        order: idx + 1,
    }));
}

const EditArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { article, loading: loadingArticle, error: errorArticle } = useGetArticle(Number(id));
    const { update, loading: loadingUpdate, error: errorUpdate } = useUpdateArticle();

    const [form, setForm] = useState<Partial<UpdateArticleInput>>({});
    const [editorContent, setEditorContent] = useState<JSONContent | undefined>(undefined);

    useEffect(() => {
        if (article) {
            setForm({
                titulo: article.titulo,
                slug: article.slug,
                resumen: article.resumen,
                estadoPublicacion: article.estadoPublicacion,
            });
            setEditorContent(articleBlocksToTiptap(article.contenidoBloques));
        }
    }, [article]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleContentChange = (content: JSONContent) => {
        setEditorContent(content);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const blocks = tiptapToArticleBlocks(editorContent || {});
        const result = await update(Number(id), {
            ...form,
            contenidoBloques: blocks,
        });
        if (result) {
            navigate("/admin/articulos");
        }
    };

    if (loadingArticle) return <div>Cargando artículo...</div>;
    if (errorArticle) return <div className="text-red-500">{errorArticle}</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar artículo</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Título</label>
                    <input
                        type="text"
                        name="titulo"
                        value={form.titulo || ""}
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
                        value={form.slug || ""}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Resumen</label>
                    <textarea
                        name="resumen"
                        value={form.resumen || ""}
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
                {errorUpdate && <div className="text-red-500">{errorUpdate}</div>}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    disabled={loadingUpdate}
                >
                    {loadingUpdate ? "Guardando..." : "Guardar cambios"}
                </button>
            </form>
        </div>
    );
};

export default EditArticlePage; 
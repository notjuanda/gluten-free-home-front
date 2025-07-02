import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { UpdateArticleInput, ArticleBlock } from "@/modules/core/types/article.type";
import { PublicationStatus } from "@/modules/core/enums/publication-status.enum";
import { useGetArticle } from "@/modules/admin/hooks/articles/useGetArticle";
import { useUpdateArticle } from "@/modules/admin/hooks/articles/useUpdateArticle";
import TipTapEditor from "@/modules/admin/components/articles/TipTapEditor";
import ArticlePortadaInfo from "@/modules/admin/components/articles/ArticlePortadaInfo";
import { FiArrowLeft, FiSave, FiFileText } from "react-icons/fi";

const estados = [
    { value: PublicationStatus.BORRADOR, label: "Borrador" },
    { value: PublicationStatus.PENDIENTE_REVISION, label: "Pendiente de revisión" },
    { value: PublicationStatus.PUBLICADO, label: "Publicado" },
];

const EditArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { article, loading: loadingArticle, error: errorArticle } = useGetArticle(Number(id));
    const { update, loading: loadingUpdate, error: errorUpdate } = useUpdateArticle();

    const [form, setForm] = useState<Partial<UpdateArticleInput>>({});
    const [editorContent, setEditorContent] = useState<ArticleBlock[]>([]);

    useEffect(() => {
        if (article) {
            setForm({
                titulo: article.titulo,
                slug: article.slug,
                resumen: article.resumen,
                estadoPublicacion: article.estadoPublicacion,
            });
            
            // Usar directamente los bloques del artículo
            setEditorContent(article.contenidoBloques || []);
        }
    }, [article]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.titulo?.trim()) {
            alert("El título es obligatorio");
            return;
        }

        if (!form.slug?.trim()) {
            alert("El slug es obligatorio");
            return;
        }

        // NO incluir urlPortada ni textoAltPortada en el update general
        // Estos se manejan por separado con el endpoint de subida de imagen
        const { urlPortada, textoAltPortada, ...updateData } = form;
        
        const result = await update(Number(id), {
            ...updateData,
            contenidoBloques: editorContent,
        });
        
        if (result) {
            navigate("/admin/articulos");
        }
    };

    if (loadingArticle) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Cargando artículo...</p>
                </div>
            </div>
        );
    }
    
    if (errorArticle) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p className="font-semibold">{errorArticle}</p>
                    <button
                        onClick={() => navigate("/admin/articulos")}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    >
                        Volver a la lista
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
            <div className="max-w-4xl mx-auto p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/admin/articulos")}
                        className="p-2 rounded-lg bg-white/80 hover:bg-white shadow-md transition-colors"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Editar Artículo</h1>
                        <p className="text-gray-600">Modifica la información del artículo</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Información sobre imagen de portada */}
                    <ArticlePortadaInfo hasImage={!!article?.urlPortada} />

                    {/* Información básica */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FiFileText className="w-5 h-5 text-primary" />
                            Información Básica
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={form.titulo || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                    placeholder="Título del artículo"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={form.slug || ""}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                    placeholder="url-amigable-del-articulo"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Resumen
                            </label>
                            <textarea
                                name="resumen"
                                value={form.resumen || ""}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                                rows={3}
                                placeholder="Breve descripción del artículo..."
                            />
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado de publicación
                            </label>
                            <select
                                name="estadoPublicacion"
                                value={form.estadoPublicacion}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            >
                                {estados.map((op) => (
                                    <option key={op.value} value={op.value}>{op.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Contenido */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Contenido del Artículo</h2>
                        <TipTapEditor 
                            value={editorContent} 
                            onChange={(newContent) => {
                                setEditorContent(newContent);
                            }} 
                        />
                    </div>

                    {/* Errores */}
                    {errorUpdate && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600">{errorUpdate}</p>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/articulos")}
                            className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loadingUpdate}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                        >
                            {loadingUpdate ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <FiSave className="w-4 h-4" />
                                    Guardar Cambios
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticlePage; 
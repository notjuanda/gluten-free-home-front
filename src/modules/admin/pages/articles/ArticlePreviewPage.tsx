import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetArticle } from "@/modules/admin/hooks/articles/useGetArticle";
import ArticlePreviewRenderer from "@/modules/admin/components/articles/ArticlePreviewRenderer";
import { FiArrowLeft, FiEdit2, FiCalendar, FiUser } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const ArticlePreviewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { article, loading, error } = useGetArticle(Number(id));

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'publicado':
                return 'bg-green-100 text-green-800';
            case 'pendiente_revision':
                return 'bg-yellow-100 text-yellow-800';
            case 'borrador':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'publicado':
                return 'Publicado';
            case 'pendiente_revision':
                return 'Pendiente de revisión';
            case 'borrador':
                return 'Borrador';
            default:
                return status;
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Cargando vista previa...</p>
            </div>
        </div>
    );
    
    if (error || !article) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center text-red-600">
                <p className="font-semibold">{error || "Artículo no encontrado"}</p>
                <button
                    onClick={() => navigate("/admin/articulos")}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                >
                    Volver a la lista
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Header de navegación */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/admin/articulos")}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Volver a la lista"
                        >
                            <FiArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div className="h-6 w-px bg-gray-300"></div>
                        <span className="text-sm text-gray-500">Vista previa</span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(article.estadoPublicacion)}`}>
                        {getStatusLabel(article.estadoPublicacion)}
                    </span>
                    <Link
                        to={`/admin/articulos/${article.id}/editar`}
                        className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                    >
                        <FiEdit2 className="w-4 h-4" />
                        Editar
                    </Link>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Imagen de portada */}
                {article.urlPortada && (
                    <div className="mb-8">
                        <img
                            src={`${API_URL}${article.urlPortada}`}
                            alt={article.textoAltPortada || article.titulo}
                        />
                    </div>
                )}

                {/* Encabezado del artículo */}
                <header className="mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {article.titulo}
                    </h1>
                    
                    {article.resumen && (
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
                            {article.resumen}
                        </p>
                    )}

                    {/* Metadatos */}
                    <div className="flex items-center gap-6 text-sm text-gray-500 border-t border-gray-200 pt-6">
                        {article.fechaPublicacion && (
                            <div className="flex items-center gap-2">
                                <FiCalendar className="w-4 h-4" />
                                <span>
                                    {new Date(article.fechaPublicacion).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        )}
                        
                        {article.autor && (
                            <div className="flex items-center gap-2">
                                <FiUser className="w-4 h-4" />
                                <span>{article.autor.nombreCompleto || article.autor.nombreUsuario || 'Autor'}</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Contenido del artículo */}
                <article className="prose prose-lg max-w-none">
                    <ArticlePreviewRenderer blocks={article.contenidoBloques || []} />
                </article>
            </main>

            {/* Indicador de vista previa */}
            <div className="fixed bottom-6 right-6 bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
                Vista previa
            </div>
        </div>
    );
};

export default ArticlePreviewPage; 
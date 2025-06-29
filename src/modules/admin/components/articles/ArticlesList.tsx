import type { ArticlesListProps } from "@/modules/admin/types/articles-components.type";
import { Link } from "react-router-dom";
import { FiFileText, FiEdit2, FiEye, FiXCircle, FiImage, FiCalendar, FiUser } from "react-icons/fi";
import ArticlePortadaModal from "./ArticlePortadaModal";
import ArticleDeleteButton from "./ArticleDeleteButton";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const ArticlesList = ({ articles, loading, error, refetch }: ArticlesListProps) => {
    const [portadaModalOpen, setPortadaModalOpen] = useState<{ isOpen: boolean; articleId: number | null }>({
        isOpen: false,
        articleId: null
    });

    if (loading) return (
        <div className="flex flex-col items-center py-16 animate-fade-in">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <span className="text-muted-foreground text-lg font-medium">Cargando artículos...</span>
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-red-500">
            <FiXCircle className="h-10 w-10 mb-2" />
            <span className="font-semibold">{error}</span>
        </div>
    );
    if (!articles.length) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-muted-foreground">
            <FiFileText className="h-10 w-10 mb-2" />
            <span className="font-semibold">No hay artículos registrados.</span>
        </div>
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'publicado':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'pendiente_revision':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'borrador':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
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

    const handlePortadaClick = (articleId: number) => {
        setPortadaModalOpen({ isOpen: true, articleId });
    };

    const handlePortadaClose = () => {
        setPortadaModalOpen({ isOpen: false, articleId: null });
    };

    const handlePortadaSuccess = () => {
        if (refetch) refetch();
        handlePortadaClose();
    };

    const handleArticleDeleted = () => {
        if (refetch) refetch();
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                        {/* Imagen de portada */}
                        <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
                            {article.urlPortada ? (
                                <img
                                    src={`${API_URL}${article.urlPortada}`}
                                    alt={article.textoAltPortada || article.titulo}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <FiImage className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                            
                            {/* Overlay con acciones */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link
                                        to={`/admin/articulos/${article.id}/vista-previa`}
                                        className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-green-600 transition-colors"
                                        title="Vista previa"
                                    >
                                        <FiEye className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handlePortadaClick(article.id)}
                                        className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 transition-colors"
                                        title={article.urlPortada ? "Cambiar imagen de portada" : "Agregar imagen de portada"}
                                    >
                                        <FiImage className="w-4 h-4" />
                                    </button>
                                    <Link
                                        to={`/admin/articulos/${article.id}/editar`}
                                        className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-green-600 transition-colors"
                                        title="Editar artículo"
                                    >
                                        <FiEdit2 className="w-4 h-4" />
                                    </Link>
                                    <ArticleDeleteButton
                                        id={article.id}
                                        title={article.titulo}
                                        onDeleted={handleArticleDeleted}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-6">
                            {/* Título y estado */}
                            <div className="mb-3">
                                <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                    {article.titulo}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(article.estadoPublicacion)}`}>
                                        {getStatusLabel(article.estadoPublicacion)}
                                    </span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                        ID: {article.id}
                                    </span>
                                </div>
                            </div>

                            {/* Resumen */}
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                {article.resumen || 'Sin resumen disponible.'}
                            </p>

                            {/* Metadatos */}
                            <div className="space-y-2 text-xs text-gray-500">
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="w-3 h-3" />
                                    <span>
                                        {article.fechaPublicacion 
                                            ? new Date(article.fechaPublicacion).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                            : 'Sin fecha de publicación'
                                        }
                                    </span>
                                </div>
                                
                                {article.autor && (
                                    <div className="flex items-center gap-2">
                                        <FiUser className="w-3 h-3" />
                                        <span>{article.autor.nombreCompleto || article.autor.nombreUsuario || 'Autor desconocido'}</span>
                                    </div>
                                )}

                                {/* Categorías y tags */}
                                <div className="flex flex-wrap gap-1 pt-2">
                                    {article.categorias?.slice(0, 2).map((cat) => (
                                        <span key={cat.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                            {cat.nombre}
                                        </span>
                                    ))}
                                    {article.categorias && article.categorias.length > 2 && (
                                        <span className="text-xs text-gray-500">
                                            +{article.categorias.length - 2} más
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de imagen de portada */}
            {portadaModalOpen.isOpen && portadaModalOpen.articleId && (
                <ArticlePortadaModal
                    isOpen={portadaModalOpen.isOpen}
                    onClose={handlePortadaClose}
                    articleId={portadaModalOpen.articleId}
                    onSuccess={handlePortadaSuccess}
                />
            )}
        </>
    );
};

export default ArticlesList; 
import type { ArticlesListProps } from "@/modules/admin/types/articles-components.type";
import { Link } from "react-router-dom";
import { FiFileText, FiEdit2, FiEye, FiXCircle } from "react-icons/fi";

const ArticlesList = ({ articles, loading, error }: ArticlesListProps) => {
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {articles.map((article) => (
                <div
                    key={article.id}
                    className="relative group border border-primary/10 rounded-2xl shadow-xl p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <Link
                            to={`/admin/articulos/${article.id}`}
                            className="p-2 rounded-full bg-background border border-border shadow hover:bg-primary/10 text-primary hover:text-primary-dark transition"
                            title="Ver"
                        >
                            <FiEye className="w-4 h-4" />
                        </Link>
                        <Link
                            to={`/admin/articulos/${article.id}/editar`}
                            className="p-2 rounded-full bg-background border border-border shadow hover:bg-green-100 text-green-700 hover:text-green-900 transition"
                            title="Editar"
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 w-full mb-2">
                        <div className="rounded-full p-2 border border-primary/20">
                            <FiFileText className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-extrabold text-lg text-foreground tracking-tight truncate">{article.titulo}</div>
                            <span className="inline-block border border-primary/20 text-primary px-2 py-0.5 rounded text-xs font-semibold bg-transparent">ID: {article.id}</span>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2 mb-1">{article.resumen || 'Sin resumen.'}</div>
                    <div className="flex flex-wrap gap-2 items-center text-xs">
                        <span className="font-semibold text-primary capitalize">{article.estadoPublicacion}</span>
                        <span className="ml-auto">{article.fechaPublicacion ? new Date(article.fechaPublicacion).toLocaleDateString() : "Sin fecha"}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ArticlesList; 
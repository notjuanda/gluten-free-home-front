import { useGetArticles } from "@/modules/admin/hooks/articles/useGetArticles";
import ArticlesList from "@/modules/admin/components/articles/ArticlesList";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

export default function ArticlesPage() {
    const { articles, loading, error } = useGetArticles();
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] from-primary/5 via-background to-primary/10 px-2 sm:px-0">
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-6 py-5 rounded-b-2xl shadow-md mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Artículos</h1>
                <button
                    className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-primary/90 transition"
                    aria-label="Crear artículo"
                    onClick={() => navigate('/admin/articulos/crear')}
                >
                    <FiPlus className="w-5 h-5" />
                    <span className="hidden sm:inline">Agregar</span>
                </button>
            </div>
            <ArticlesList articles={articles} loading={loading} error={error} />
        </div>
    );
} 
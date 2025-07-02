import React from 'react';
import { useParams } from 'react-router-dom';
import { useClientArticle } from '../hooks/useClientArticle';
import BlogCommentsList from '../components/BlogCommentsList';
import BlogCommentForm from '../components/BlogCommentForm';
import ArticlePreviewRenderer from '@/modules/admin/components/articles/ArticlePreviewRenderer';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { article, loading, error } = useClientArticle(Number(id));

    if (loading) return <div className="py-8 text-center text-gray-500">Cargando artículo...</div>;
    if (error) return <div className="py-8 text-center text-red-500">{error}</div>;
    if (!article) return <div className="py-8 text-center text-gray-400">Artículo no encontrado.</div>;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{article.titulo}</h1>
        {article.urlPortada && (
            <img
            src={import.meta.env.VITE_API_BASE_URL + article.urlPortada}
            alt={article.textoAltPortada || article.titulo}
            className="w-full h-64 object-cover rounded mb-6"
            />
        )}
        <div className="mb-8">
            <ArticlePreviewRenderer blocks={article.contenidoBloques} />
        </div>
        <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Comentarios</h2>
            <BlogCommentsList articleId={article.id} />
            <div className="mt-6">
            <BlogCommentForm articleId={article.id} />
            </div>
        </section>
        </div>
    );
};

export default BlogDetailPage; 
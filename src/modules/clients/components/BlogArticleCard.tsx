import React from 'react';
import type { Article } from '@/modules/core/types/article.type';
import { Link } from 'react-router-dom';

interface Props {
    article: Article;
}

const BlogArticleCard: React.FC<Props> = ({ article }) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 overflow-hidden flex flex-col">
        {article.urlPortada && (
            <Link to={`/blog/${article.id}`}>
            <img
                src={`${API_URL}${article.urlPortada}`}
                alt={article.textoAltPortada || article.titulo}
                className="w-full h-48 object-cover"
            />
            </Link>
        )}
        <div className="p-5 flex-1 flex flex-col">
            <Link to={`/blog/${article.id}`} className="hover:text-primary">
            <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.titulo}</h2>
            </Link>
            {article.resumen && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.resumen}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-auto">
            {article.tags?.map(tag => (
                <span key={tag.id} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {tag.nombre}
                </span>
            ))}
            </div>
            <div className="text-xs text-gray-400 mt-2">
            {article.fechaPublicacion && (
                <span>
                {new Date(article.fechaPublicacion).toLocaleDateString('es-ES', {
                    year: 'numeric', month: 'short', day: 'numeric'
                })}
                </span>
            )}
            </div>
        </div>
        </div>
    );
};

export default BlogArticleCard; 
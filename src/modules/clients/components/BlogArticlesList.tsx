import React, { useState, useMemo } from 'react';
import { useClientArticles } from '../hooks/useClientArticles';
import { useClientCategories } from '../hooks/useClientCategories';
import { useClientTags } from '../hooks/useClientTags';
import BlogCategoryChips from './BlogCategoryChips';
import BlogTagChips from './BlogTagChips';
import BlogArticleCard from './BlogArticleCard';

const BlogArticlesList: React.FC = () => {
    const { articles, loading, error } = useClientArticles();
    const { categories } = useClientCategories();
    const { tags } = useClientTags();
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedTag, setSelectedTag] = useState<number | null>(null);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
        const byCategory = selectedCategory ? article.categorias?.some(cat => cat.id === selectedCategory) : true;
        const byTag = selectedTag ? article.tags?.some(tag => tag.id === selectedTag) : true;
        return byCategory && byTag;
        });
    }, [articles, selectedCategory, selectedTag]);

    if (loading) return <div className="py-8 text-center text-gray-500">Cargando artículos...</div>;
    if (error) return <div className="py-8 text-center text-red-500">{error}</div>;
    if (!articles.length) return <div className="py-8 text-center text-gray-400">No hay artículos publicados.</div>;

    return (
        <div>
        <BlogCategoryChips categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
        <BlogTagChips tags={tags} selected={selectedTag} onSelect={setSelectedTag} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredArticles.map(article => (
            <BlogArticleCard key={article.id} article={article} />
            ))}
        </div>
        {filteredArticles.length === 0 && (
            <div className="py-8 text-center text-gray-400">No hay artículos para los filtros seleccionados.</div>
        )}
        </div>
    );
};

export default BlogArticlesList;
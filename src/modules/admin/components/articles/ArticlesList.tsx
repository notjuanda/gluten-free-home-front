import type { ArticlesListProps } from "@/modules/admin/types/articles-components.type";
import { FiFileText, FiXCircle } from "react-icons/fi";
import ArticleCard from "./ArticleCard";
import ArticleModals from "./ArticleModals";
import { useState } from "react";

const ArticlesList = ({ articles, loading, error, refetch }: ArticlesListProps) => {
    const [portadaModalOpen, setPortadaModalOpen] = useState<{ isOpen: boolean; articleId: number | null }>({
        isOpen: false,
        articleId: null
    });
    const [tagsModalOpen, setTagsModalOpen] = useState<{ isOpen: boolean; articleId: number | null }>({
        isOpen: false,
        articleId: null
    });
    const [categoriesModalOpen, setCategoriesModalOpen] = useState<{ isOpen: boolean; articleId: number | null }>({
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

    const handleTagsClick = (articleId: number) => {
        setTagsModalOpen({ isOpen: true, articleId });
    };

    const handleTagsClose = () => {
        setTagsModalOpen({ isOpen: false, articleId: null });
    };

    const handleCategoriesClick = (articleId: number) => {
        setCategoriesModalOpen({ isOpen: true, articleId });
    };

    const handleCategoriesClose = () => {
        setCategoriesModalOpen({ isOpen: false, articleId: null });
    };

    const handleTagsCategoriesUpdate = () => {
        if (refetch) refetch();
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onPortadaClick={handlePortadaClick}
                        onTagsClick={handleTagsClick}
                        onCategoriesClick={handleCategoriesClick}
                        onDeleted={handleArticleDeleted}
                    />
                ))}
            </div>

            <ArticleModals
                portadaModal={portadaModalOpen}
                tagsModal={tagsModalOpen}
                categoriesModal={categoriesModalOpen}
                onPortadaClose={handlePortadaClose}
                onPortadaSuccess={handlePortadaSuccess}
                onTagsClose={handleTagsClose}
                onCategoriesClose={handleCategoriesClose}
                onTagsCategoriesUpdate={handleTagsCategoriesUpdate}
            />
        </>
    );
};

export default ArticlesList; 
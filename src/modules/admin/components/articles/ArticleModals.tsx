import ArticlePortadaModal from "./ArticlePortadaModal";
import ArticleTagsModal from "./ArticleTagsModal";
import ArticleCategoriesModal from "./ArticleCategoriesModal";

interface ArticleModalsProps {
    portadaModal: { isOpen: boolean; articleId: number | null };
    tagsModal: { isOpen: boolean; articleId: number | null };
    categoriesModal: { isOpen: boolean; articleId: number | null };
    onPortadaClose: () => void;
    onPortadaSuccess: () => void;
    onTagsClose: () => void;
    onCategoriesClose: () => void;
    onTagsCategoriesUpdate: () => void;
}

export default function ArticleModals({
    portadaModal,
    tagsModal,
    categoriesModal,
    onPortadaClose,
    onPortadaSuccess,
    onTagsClose,
    onCategoriesClose,
    onTagsCategoriesUpdate
}: ArticleModalsProps) {
    return (
        <>
            {/* Modal de imagen de portada */}
            {portadaModal.isOpen && portadaModal.articleId && (
                <ArticlePortadaModal
                    isOpen={portadaModal.isOpen}
                    onClose={onPortadaClose}
                    articleId={portadaModal.articleId}
                    onSuccess={onPortadaSuccess}
                />
            )}

            {/* Modal de tags */}
            {tagsModal.isOpen && tagsModal.articleId && (
                <ArticleTagsModal
                    isOpen={tagsModal.isOpen}
                    onClose={onTagsClose}
                    articleId={tagsModal.articleId}
                    onUpdate={onTagsCategoriesUpdate}
                />
            )}

            {/* Modal de categorías */}
            {categoriesModal.isOpen && categoriesModal.articleId && (
                <ArticleCategoriesModal
                    isOpen={categoriesModal.isOpen}
                    onClose={onCategoriesClose}
                    articleId={categoriesModal.articleId}
                    onUpdate={onTagsCategoriesUpdate}
                />
            )}
        </>
    );
} 
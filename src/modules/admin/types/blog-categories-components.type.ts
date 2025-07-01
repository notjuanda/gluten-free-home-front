export interface BlogCategoriesListProps {
    refreshTrigger?: unknown;
}

export interface BlogCategoryDeleteButtonProps {
    id: number;
    name: string;
    onDeleted: () => void;
}

export interface EditBlogCategoryModalProps {
    open: boolean;
    onClose: () => void;
    categoryId: number | null;
    onUpdated?: () => void;
}

export interface CreateBlogCategoryModalProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
} 
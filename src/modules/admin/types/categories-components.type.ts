export interface CategoriesListProps {
    refreshTrigger?: unknown;
}

export interface CategoryDeleteButtonProps {
    id: number;
    name: string;
    onDeleted: () => void;
}

export interface EditCategoryModalProps {
    open: boolean;
    onClose: () => void;
    categoryId: number | null;
    onUpdated?: () => void;
}

export interface CreateCategoryModalProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
}
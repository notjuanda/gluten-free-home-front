export interface IngredientsListProps {
    refreshTrigger?: unknown;
}

export interface IngredientDeleteButtonProps {
    id: number;
    name: string;
    onDeleted: () => void;
}

export interface EditIngredientModalProps {
    open: boolean;
    onClose: () => void;
    ingredientId: number | null;
    onUpdated?: () => void;
}

export interface CreateIngredientModalProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
}
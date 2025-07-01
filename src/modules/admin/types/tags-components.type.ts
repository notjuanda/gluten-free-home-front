export interface TagsListProps {
    refreshTrigger?: unknown;
}

export interface TagDeleteButtonProps {
    id: number;
    name: string;
    onDeleted: () => void;
}

export interface EditTagModalProps {
    open: boolean;
    onClose: () => void;
    tagId: number | null;
    onUpdated?: () => void;
}

export interface CreateTagModalProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
} 
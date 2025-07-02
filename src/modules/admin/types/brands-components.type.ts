export interface BrandDeleteButtonProps {
    id: number;
    name: string;
    onDeleted: () => void;
}

export interface BrandsListProps {
    refreshTrigger?: unknown;
}

export interface CreateBrandModalProps {
    open: boolean;
    onClose: () => void;
    onCreated?: () => void;
}

export interface EditBrandModalProps {
    open: boolean;
    onClose: () => void;
    brandId: number | null;
    onUpdated?: () => void;
}
import type { ProductImage } from "@/modules/core/types/product-image.type";
import type { Product } from "@/modules/core/types/product.type";
import type { CreateProductSchema } from "../schemas/product.schema";

export interface ProductImagesCarouselProps {
    images: ProductImage[];
    isOpen: boolean;
    onClose: () => void;
    initialIndex?: number;
    productId: number;
}

export interface ProductsListProps {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export interface ProductsListPropsWithRefresh extends ProductsListProps {
    refreshTrigger?: () => void;
}

export interface ProductFormProps {
    onSubmit?: (data: CreateProductSchema) => void;
}

export interface ProductDeleteButtonProps {
    id: number;
    name: string;
    onDeleted: () => void;
}

export interface UploadImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    productName: string;
}

export interface UploadImageButtonProps {
    productId: number;
    productName: string;
    className?: string;
}

export interface UploadImageFormProps {
    productId: number;
    productName: string;
    onSuccess?: () => void;
}

export interface FormData {
    textoAlt: string;
}


export interface DeleteImageConfirmDialogProps {
    image: ProductImage | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading?: boolean;
}

export interface DeleteImageButtonProps {
    image: ProductImage;
    productId: number;
    className?: string;
}

export interface ViewImagesButtonProps {
    productId: number;
    productName: string;
    className?: string;
}

export interface EditProductModalProps {
    open: boolean;
    onClose: () => void;
    productId: number | null;
    onUpdated?: () => void;
}
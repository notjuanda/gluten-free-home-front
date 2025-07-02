import type { Brand } from "@/modules/core/types/brand.type";
import type { Ingredient } from "@/modules/core/types/ingredient.type";
import type { ProductCategory } from "@/modules/core/types/product-category.type";
import type { Product } from "@/modules/core/types/product.type";

export interface TopProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export interface ProductsListProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

export interface FiltersState {
    categories: number[];
    brands: number[];
    ingredients: number[];
    certified: boolean;
}

export interface ProductsFilterSidebarProps {
    filters: FiltersState;
    setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
    categories: ProductCategory[];
    brands: Brand[];
    ingredients: Ingredient[];
}

export interface TopProductCardProps {
    product: Product;
}

export interface RecommendedProductsSectionProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    title?: string;
    subtitle?: string;
}

export interface RecommendedProductsProps {
    onAddToCart: (product: Product) => void;
}

export interface ProductDetailProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export interface LoginRequiredModalProps {
    visible: boolean;
    onClose: () => void;
}

export interface AddressSelectorProps {
    selectedAddressId: number | null;
    onSelectAddress: (id: number) => void;
}

export interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface StripeCheckoutProps {
    usuarioId: number | undefined;
    direccionEnvioId: number | null;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}
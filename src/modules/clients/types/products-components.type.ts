import type { Brand } from "@/modules/core/types/brand.type";
import type { Ingredient } from "@/modules/core/types/ingredient.type";
import type { ProductCategory } from "@/modules/core/types/product-category.type";
import type { Product } from "@/modules/core/types/product.type";

export interface TopProductCardProps {
    product: Product;
}

export interface ProductsListProps {
    products: Product[];
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
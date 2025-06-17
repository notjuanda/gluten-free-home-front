import type { Product } from './product.type';

export interface ProductCategory {
    id: number;
    nombre: string;
    slug: string;

    products?: Product[];

    createdAt: string;
    updatedAt: string;
}

export interface CreateProductCategoryInput {
    nombre: string;
    slug: string;
}

export type UpdateProductCategoryInput = Partial<CreateProductCategoryInput>;
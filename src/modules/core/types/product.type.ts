/* src/modules/admin/core/types/product.type.ts */
import type { Brand } from './brand.type';
import type { ProductCategory } from './product-category.type';
import type { ProductImage } from './product-image.type';
import type { Ingredient } from './ingredient.type';

export interface Product {
    id: number;
    nombre: string;
    slug: string;
    descripcion?: string;

    marca?: Brand | null;

    categoria: ProductCategory;

    precioBob: number;
    precioUsd?: number;
    stock: number;
    activo: boolean;
    certificadoSinGluten: boolean;
    urlCertificado?: string;

    imagenes?: ProductImage[];
    ingredientes?: Ingredient[];

    createdAt: string;
    updatedAt: string;
}

export interface CreateProductInput {
    nombre: string;
    slug: string;
    descripcion?: string;
    precioBob: number;
    precioUsd?: number;
    stock?: number;
    activo?: boolean;
    certificadoSinGluten?: boolean;
    urlCertificado?: string;
    marcaId?: number;
    categoriaId: number;
    ingredientesIds?: number[];
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface AssignCategoryInput   { categoriaId: number; }
export interface AssignBrandInput      { marcaId: number; }
export interface AssignIngredientsInput{ ingredientesIds: number[]; }

export interface UploadImageInput  { file: File; textoAlt?: string; }
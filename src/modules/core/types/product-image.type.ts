import type { Product } from './product.type';

export interface ProductImage {
    id: number;
    urlImagen: string;
    textoAlt?: string;

    producto?: Product;

    createdAt: string;
    updatedAt: string;
}

export interface CreateProductImageInput {
    productoId: number;    
    urlImagen: string;
    textoAlt?: string;
}

export type UpdateProductImageInput = Partial<Omit<CreateProductImageInput, 'productoId'>>;
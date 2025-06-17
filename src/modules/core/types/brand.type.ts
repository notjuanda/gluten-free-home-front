import type { Product } from './product.type';

export interface Brand {
    id: number;
    nombre: string;

    products?: Product[];

    createdAt: string;
    updatedAt: string;
}

export interface CreateBrandInput {
    nombre: string;
}

export type UpdateBrandInput = Partial<CreateBrandInput>;
import type { Product } from './product.type';

export interface Ingredient {
    id: number;
    nombre: string;

    products?: Product[];

    createdAt: string;
    updatedAt: string;
}

export interface CreateIngredientInput {
    nombre: string;
}

export type UpdateIngredientInput = Partial<CreateIngredientInput>;
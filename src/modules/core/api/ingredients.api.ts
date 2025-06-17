import api from './instance.api';
import type {
    Ingredient,
    CreateIngredientInput,
    UpdateIngredientInput,
} from '../types/ingredient.type';
import type { Product } from '../types/product.type';

export const getIngredients = async (): Promise<Ingredient[]> =>
    (await api.get<Ingredient[]>('/ingredients')).data;

export const getIngredient = async (id: number): Promise<Ingredient> =>
    (await api.get<Ingredient>(`/ingredients/${id}`)).data;

export const getProductsByIngredient = async (id: number): Promise<Product[]> =>
    (await api.get<Product[]>(`/ingredients/${id}/productos`)).data;

export const createIngredient = async (
    payload: CreateIngredientInput,
): Promise<Ingredient> =>
    (await api.post<Ingredient>('/ingredients', payload)).data;

export const updateIngredient = async (
    id: number,
    payload: UpdateIngredientInput,
): Promise<Ingredient> =>
    (await api.patch<Ingredient>(`/ingredients/${id}`, payload)).data;

export const deleteIngredient = async (id: number): Promise<void> => {
    await api.delete(`/ingredients/${id}`);
};

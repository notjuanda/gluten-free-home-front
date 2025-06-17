import api from './instance.api';
import type {
    ProductCategory,
    CreateProductCategoryInput,
    UpdateProductCategoryInput,
} from '../types/product-category.type';

export const getProductCategories = async (): Promise<ProductCategory[]> =>
    (await api.get<ProductCategory[]>('/product-categories')).data;

export const getProductCategory = async (
    id: number,
): Promise<ProductCategory> =>
    (await api.get<ProductCategory>(`/product-categories/${id}`)).data;

export const createProductCategory = async (
    payload: CreateProductCategoryInput,
): Promise<ProductCategory> =>
    (await api.post<ProductCategory>('/product-categories', payload)).data;

export const updateProductCategory = async (
    id: number,
    payload: UpdateProductCategoryInput,
): Promise<ProductCategory> =>
    (await api.patch<ProductCategory>(`/product-categories/${id}`, payload))
        .data;

export const deleteProductCategory = async (id: number): Promise<void> => {
    await api.delete(`/product-categories/${id}`);
};

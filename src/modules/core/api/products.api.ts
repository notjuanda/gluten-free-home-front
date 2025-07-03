import api from './instance.api';
import type {
    Product,
    CreateProductInput,
    UpdateProductInput,
    AssignCategoryInput,
    AssignBrandInput,
    AssignIngredientsInput,
} from '../types/product.type';
import type { Ingredient } from '../types/ingredient.type';
import type { ProductImage } from '../types/product-image.type';
import type { TopProduct } from '../types/topProducts.type';

export const getProducts = async (): Promise<Product[]> =>
    (await api.get<Product[]>('/products')).data;

export const getProduct = async (id: number): Promise<Product> =>
    (await api.get<Product>(`/products/${id}`)).data;

export const createProduct = async (payload: CreateProductInput): Promise<Product> =>
    (await api.post<Product>('/products', payload)).data;

export const updateProduct = async (id: number, payload: UpdateProductInput): Promise<Product> =>
    (await api.patch<Product>(`/products/${id}`, payload)).data;

export const deleteProduct = async (id: number): Promise<void> =>
    api.delete(`/products/${id}`);

export const assignProductCategory = async (id: number, payload: AssignCategoryInput): Promise<Product> =>
    (await api.patch<Product>(`/products/${id}/categoria`, payload)).data;

export const assignProductBrand = async (id: number, payload: AssignBrandInput): Promise<Product> =>
    (await api.patch<Product>(`/products/${id}/marca`, payload)).data;

export const assignProductIngredients = async (id: number, payload: AssignIngredientsInput): Promise<Product> =>
    (await api.patch<Product>(`/products/${id}/ingredientes`, payload)).data;

export const getProductIngredients = async (id: number): Promise<Ingredient[]> =>
    (await api.get<Ingredient[]>(`/products/${id}/ingredientes`)).data;

export const getProductImages = async (id: number): Promise<ProductImage[]> =>
    (await api.get<ProductImage[]>(`/products/${id}/imagenes`)).data;

export const uploadProductImage = async (
    id: number,
    { file, textoAlt }: { file: File; textoAlt?: string }
): Promise<ProductImage> => {
    const form = new FormData();
    form.append('file', file);
    if (textoAlt) form.append('textoAlt', textoAlt);
    return (await api.post<ProductImage>(`/products/${id}/imagenes`, form)).data;
};

export const deleteProductImage = async (productId: number, imageId: number): Promise<void> =>
    api.delete(`/products/${productId}/imagenes/${imageId}`);

export const getTopProducts = async (limit = 10): Promise<TopProduct[]> =>
    (await api.get<TopProduct[]>(`/products/top${limit ? `?limit=${limit}` : ''}`)).data;

export const getProductBySlug = async (slug: string): Promise<Product> =>
    (await api.get<Product>(`/products/slug/${slug}`)).data;

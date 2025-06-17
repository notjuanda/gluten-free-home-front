import api from './instance.api';
import type {
    BlogCategory,
    CreateBlogCategoryInput,
    UpdateBlogCategoryInput,
} from '../types/blog-category.type';

export const getBlogCategories = async (): Promise<BlogCategory[]> =>
    (await api.get<BlogCategory[]>('/blog-categories')).data;

export const getBlogCategory = async (id: number): Promise<BlogCategory> =>
    (await api.get<BlogCategory>(`/blog-categories/${id}`)).data;

export const createBlogCategory = async (
    payload: CreateBlogCategoryInput,
): Promise<BlogCategory> =>
    (await api.post<BlogCategory>('/blog-categories', payload)).data;

export const updateBlogCategory = async (
    id: number,
    payload: UpdateBlogCategoryInput,
): Promise<BlogCategory> =>
    (await api.patch<BlogCategory>(`/blog-categories/${id}`, payload)).data;

export const deleteBlogCategory = async (id: number): Promise<void> => {
    await api.delete(`/blog-categories/${id}`);
};

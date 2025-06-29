import api from './instance.api';
import type {
    Article,
    CreateArticleInput,
    UpdateArticleInput,
    AssignTagsInput,
    AssignCategoriesInput,
} from '../types/article.type';
import type { BlogCategory } from '../types/blog-category.type';
import type { Tag } from '../types/tag.type';

export const getArticles = async (): Promise<Article[]> =>
    (await api.get<Article[]>('/articles')).data;

export const getArticle = async (id: number): Promise<Article> =>
    (await api.get<Article>(`/articles/${id}`)).data;

export const createArticle = async (
    payload: CreateArticleInput,
): Promise<Article> =>
    (await api.post<Article>('/articles', payload)).data;

export const updateArticle = async (
    id: number,
    payload: UpdateArticleInput,
): Promise<Article> =>
    (await api.patch<Article>(`/articles/${id}`, payload)).data;

export const deleteArticle = async (id: number): Promise<void> => {
    await api.delete(`/articles/${id}`);
};

export const assignTagsToArticle = async (
    id: number,
    payload: AssignTagsInput,
): Promise<Article> =>
    (await api.patch<Article>(`/articles/${id}/tags`, payload)).data;

export const assignCategoriesToArticle = async (
    id: number,
    payload: AssignCategoriesInput,
): Promise<Article> =>
    (await api.patch<Article>(`/articles/${id}/categorias`, payload)).data;

export const getArticleTags = async (id: number): Promise<Tag[]> =>
    (await api.get<Tag[]>(`/articles/${id}/tags`)).data;

export const getArticleCategories = async (
    id: number,
): Promise<BlogCategory[]> =>
    (await api.get<BlogCategory[]>(`/articles/${id}/categorias`)).data;

export const uploadArticlePortada = async (
    id: number,
    file: File,
    textoAlt?: string,
): Promise<Article> => {
    const formData = new FormData();
    formData.append('file', file);
    if (textoAlt) formData.append('textoAlt', textoAlt);
    
    return (await api.patch<Article>(`/articles/${id}/portada`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })).data;
};

export const uploadBlockImage = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    return (await api.post<{ url: string }>('/articles/upload-block-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })).data;
};

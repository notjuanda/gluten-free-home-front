import type { Article } from './article.type';

export interface BlogCategory {
    id: number;
    nombre: string;
    slug: string;
    articulos?: Article[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateBlogCategoryInput {
    nombre: string;
    slug: string;
}

export type UpdateBlogCategoryInput = Partial<CreateBlogCategoryInput>;
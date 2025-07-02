import type { Article } from './article.type';

export interface Tag {
    id: number;
    nombre: string;
    slug: string;
    articulos?: Article[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateTagInput {
    nombre: string;
    slug: string;
}

export type UpdateTagInput = Partial<CreateTagInput>;

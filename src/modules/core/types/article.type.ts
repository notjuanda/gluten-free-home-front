import type { User } from "@/modules/admin/types/users.types";
import type { PublicationStatus } from "../enums/publication-status.enum";
import type { BlogCategory } from "./blog-category.type";
import type { Tag } from "./tag.type";

export interface Article {
    id: number;
    autor?: User;
    titulo: string;
    slug: string;
    contenidoMd: string;
    resumen?: string;
    urlPortada?: string;
    textoAltPortada?: string;
    estadoPublicacion: PublicationStatus;
    fechaPublicacion?: string;
    createdAt: string;
    updatedAt: string;

    categorias?: BlogCategory[];
    tags?: Tag[];
    comentarios?: Comment[];
}

export interface CreateArticleInput {
    titulo: string;
    slug: string;
    contenidoMd: string;
    resumen?: string;
    urlPortada?: string;
    textoAltPortada?: string;
    estadoPublicacion?: PublicationStatus;
    categoriasIds?: number[];
    tagsIds?: number[];
}

export type UpdateArticleInput = Partial<CreateArticleInput>;

export interface AssignTagsInput {
    tagIds: number[];
}

export interface AssignCategoriesInput {
    categoryIds: number[];
}
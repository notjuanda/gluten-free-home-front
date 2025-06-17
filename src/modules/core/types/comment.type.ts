import type { CommentStatus } from '../enums/comment-status.enum';
import type { Article } from './article.type';
import type { User } from '@/modules/admin/types/users.types';

export interface Comment {
    id: number;
    articulo?: Article;
    usuario?: User;
    contenido: string;
    estado: CommentStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCommentInput {
    articuloId: number;
    contenido: string;
    usuarioId?: number;
}

export interface ModerateCommentInput {
    estado: CommentStatus;
}
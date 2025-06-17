import api from './instance.api';
import type {
    Comment,
    CreateCommentInput,
    ModerateCommentInput,
} from '../types/comment.type';

export const getComments = async (): Promise<Comment[]> =>
    (await api.get<Comment[]>('/comments')).data;

export const getCommentsByArticle = async (articleId: number): Promise<Comment[]> =>
    (await api.get<Comment[]>(`/comments/by-article/${articleId}`)).data;

export const getCommentsByUser = async (userId: number): Promise<Comment[]> =>
    (await api.get<Comment[]>(`/comments/by-user/${userId}`)).data;

export const createComment = async (
    payload: CreateCommentInput,
): Promise<Comment> =>
    (await api.post<Comment>('/comments', payload)).data;

export const moderateComment = async (
    id: number,
    payload: ModerateCommentInput,
): Promise<Comment> =>
    (await api.patch<Comment>(`/comments/${id}/moderate`, payload)).data;

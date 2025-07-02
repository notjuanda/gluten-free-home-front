import api from './instance.api';
import type {
    Tag,
    CreateTagInput,
    UpdateTagInput,
} from '../types/tag.type';

export const getTags = async (): Promise<Tag[]> =>
    (await api.get<Tag[]>('/tags')).data;

export const getTag = async (id: number): Promise<Tag> =>
    (await api.get<Tag>(`/tags/${id}`)).data;

export const createTag = async (
    payload: CreateTagInput,
): Promise<Tag> =>
    (await api.post<Tag>('/tags', payload)).data;

export const updateTag = async (
    id: number,
    payload: UpdateTagInput,
): Promise<Tag> =>
    (await api.patch<Tag>(`/tags/${id}`, payload)).data;

export const deleteTag = async (id: number): Promise<void> => {
    await api.delete(`/tags/${id}`);
}; 
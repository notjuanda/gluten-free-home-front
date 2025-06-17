import api from './instance.api';
import type { Permission } from '../types/permission.type';

export type CreatePermissionInput = Omit<Permission, 'id'>;
export type UpdatePermissionInput = Partial<CreatePermissionInput>;

export const getPermissions = async (): Promise<Permission[]> =>
    (await api.get<Permission[]>('/permissions')).data;

export const getPermission = async (id: number): Promise<Permission> =>
    (await api.get<Permission>(`/permissions/${id}`)).data;

export const createPermission = async (
    payload: CreatePermissionInput,
): Promise<Permission> =>
    (await api.post<Permission>('/permissions', payload)).data;

export const updatePermission = async (
    id: number,
    payload: UpdatePermissionInput,
): Promise<Permission> =>
    (await api.put<Permission>(`/permissions/${id}`, payload)).data;

export const deletePermission = async (id: number): Promise<void> => {
    await api.delete(`/permissions/${id}`);
};

import api from './instance.api';
import type { Role, CreateRoleInput, UpdateRoleInput } from '../types/role.type';

export const getRoles = async (): Promise<Role[]> =>
    (await api.get<Role[]>('/roles')).data;

export const getRole = async (id: number): Promise<Role> =>
    (await api.get<Role>(`/roles/${id}`)).data;

export const createRole = async (payload: CreateRoleInput): Promise<Role> =>
    (await api.post<Role>('/roles', payload)).data;

export const updateRole = async (
    id: number,
    payload: UpdateRoleInput,
): Promise<Role> =>
    (await api.patch<Role>(`/roles/${id}`, payload)).data;

export const deleteRole = async (id: number): Promise<void> => {
    await api.delete(`/roles/${id}`);
};

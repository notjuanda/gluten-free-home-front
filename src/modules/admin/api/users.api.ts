import apiInstance from '@/modules/core/api/instance.api';
import type { User, CreateUserInput, UpdateUserInput } from '@/modules/admin/types/users.types';

const basePath = '/users';

export const adminUsersApi = {
    getAll: async (): Promise<User[]> => {
        const { data } = await apiInstance.get(basePath);
        return data;
    },

    getById: async (id: number): Promise<User> => {
        const { data } = await apiInstance.get(`${basePath}/${id}`);
        return data;
    },

    create: async (input: CreateUserInput): Promise<User> => {
        const { data } = await apiInstance.post(basePath, input);
        return data;
    },

    update: async (id: number, input: UpdateUserInput): Promise<User> => {
        const { data } = await apiInstance.patch(`${basePath}/${id}`, input);
        return data;
    },

    remove: async (id: number): Promise<void> => {
        await apiInstance.delete(`${basePath}/${id}`);
    },
};

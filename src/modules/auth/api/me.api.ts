import api from '@/modules/core/api/instance.api';
import type { User } from '@/modules/admin/types/users.types';

export const profileApi = async () => {
    const { data } = await api.get<User>('/auth/me');
    return data;
};

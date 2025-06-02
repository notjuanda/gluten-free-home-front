import api from '@/modules/core/api/instance.api';
import type { User } from '@/modules/core/types/user.type';

export const profileApi = async () => {
    const { data } = await api.get<User>('/auth/me');
    return data;
};

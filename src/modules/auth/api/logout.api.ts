import api from '@/modules/core/api/instance.api';
import type { LogoutResponse } from '../types/auth.types';

export const logoutApi = async () => {
    const { data } = await api.post<LogoutResponse>('/auth/logout');
    return data;
};

import api from '@/modules/core/api/instance.api';
import type { LoginRequest, LoginResponse } from '../types/auth.types';

export const loginApi = async (body: LoginRequest) => {
    const { data } = await api.post<LoginResponse>('/auth/login', body);
    return data;
};

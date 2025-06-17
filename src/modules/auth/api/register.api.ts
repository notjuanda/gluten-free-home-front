import api from '@/modules/core/api/instance.api';
import type { RegisterRequest, RegisterResponse } from '../types/auth.types';

export const registerApi = async (body: RegisterRequest) => {
    const { data } = await api.post<RegisterResponse>('/auth/register', body);
    return data;
};

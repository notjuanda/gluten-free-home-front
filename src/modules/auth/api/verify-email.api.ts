import api from '@/modules/core/api/instance.api';
import type { VerifyEmailResponse } from '../types/auth.types';

export const verifyEmailApi = async (token: string) => {
    const { data } = await api.get<VerifyEmailResponse>(
        '/auth/verify',
        { params: { token } },
    );
    return data;
};

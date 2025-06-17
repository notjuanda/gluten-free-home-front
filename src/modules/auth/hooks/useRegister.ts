import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../api/register.api';
import type { RegisterRequest, RegisterResponse } from '../types/auth.types';

export const useRegister = () =>
    useMutation<RegisterResponse, Error, RegisterRequest>({
        mutationFn: async (data) => {
        try {
            return await registerApi(data);
        } catch (error: any) {
            const msg =
            error?.response?.data?.message || 'El usuario o email ya existe';
            throw new Error(msg);
        }
        },
    }
);

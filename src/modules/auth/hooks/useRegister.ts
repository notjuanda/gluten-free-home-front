import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../api/register.api';
import type { RegisterRequest, RegisterResponse } from '../types/auth.types';

function isAxiosErrorWithMessage(error: unknown): error is { response: { data: { message: string } } } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: unknown }).response === 'object' &&
        (error as { response: { data?: unknown } }).response?.data !== undefined &&
        typeof (error as { response: { data: { message?: unknown } } }).response.data.message === 'string'
    );
}

export const useRegister = () =>
    useMutation<RegisterResponse, Error, RegisterRequest>({
        mutationFn: async (data) => {
        try {
            return await registerApi(data);
        } catch (error: unknown) {
            const msg = isAxiosErrorWithMessage(error)
                ? error.response.data.message
                : 'El usuario o email ya existe';
            throw new Error(msg);
        }
        },
    }
);

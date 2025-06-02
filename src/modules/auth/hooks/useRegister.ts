import { useMutation } from '@tanstack/react-query';
import { registerApi } from '../api/register.api';
import type { RegisterRequest, RegisterResponse } from '../types/auth.types';

export const useRegister = () =>
    useMutation<RegisterResponse, Error, RegisterRequest>({
        mutationFn: registerApi,
    }
);

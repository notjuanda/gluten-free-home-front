import { useMutation } from '@tanstack/react-query';
import { verifyEmailApi } from '../api/verify-email.api';
import type { VerifyEmailResponse } from '../types/auth.types';

export const useVerifyEmail = () =>
    useMutation<VerifyEmailResponse, Error, string>({
        mutationFn: verifyEmailApi,
    }
);

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logoutApi } from '../api/logout.api';
import type { LogoutResponse } from '../types/auth.types';

export const useLogout = () => {
    const qc = useQueryClient();

    return useMutation<LogoutResponse, Error, void>({
        mutationFn: logoutApi,
        onSuccess: () => {
        qc.clear();
        },
    });
};

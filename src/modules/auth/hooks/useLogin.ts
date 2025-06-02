import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginApi } from '../api/login.api';
import type { LoginRequest, LoginResponse } from '../types/auth.types';

const ROLE_ROUTE: Record<string, string> = {
    admin    : '/admin/dashboard',
    vendedor : '/vendedor/dashboard',
    cliente  : '/cliente/dashboard',
    editor   : '/editor/dashboard',
};

const toAbsolute = (path: string) => (path.startsWith('/') ? path : `/${path}`);

export const useLogin = () => {
    const qc       = useQueryClient();
    const navigate = useNavigate();

    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: loginApi,

        onSuccess: ({ user }) => {
        qc.invalidateQueries({ queryKey: ['me'] });
        toast.success('¡Bienvenido de nuevo!');

        const route =
            user.roles
            ?.map(r => r.nombre.trim().toLowerCase())
            .find(rol => ROLE_ROUTE[rol]);

        if (route) {
            navigate(toAbsolute(ROLE_ROUTE[route]), { replace: true });
        } else {
            toast.error('Rol no reconocido');
            navigate('/', { replace: true });
        }
        window.location.reload();
        },

        onError: err => toast.error(err.message),
    });
};

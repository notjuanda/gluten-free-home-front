import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate }            from 'react-router-dom';
import { toast }                  from 'react-toastify';
import { isAxiosError }           from 'axios';

import { loginApi }               from '../api/login.api';
import type {
    LoginRequest,
    LoginResponse,
} from '../types/auth.types';

const ROLE_ROUTE: Record<string, string> = {
    admin    : '/admin/dashboard',
    vendedor : '/vendedor/dashboard',
    cliente  : '/cliente/dashboard',
    editor   : '/editor/dashboard',
};
const toAbs = (p: string) => (p.startsWith('/') ? p : `/${p}`);

export const useLogin = () => {
    const qc       = useQueryClient();
    const navigate = useNavigate();

    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: async (credentials) => {
        try {
            return await loginApi(credentials);
        } catch (err) {

            if (isAxiosError(err) && err.response) {
            const { status, data } = err.response;
            const backend = (data?.message ?? '') as string;

            if (
                status === 401 &&
                backend.toLowerCase().includes('verific')
            ) {
                throw new Error('REDIRECT_VERIFY_EMAIL');
            }

            throw new Error(
                backend || 'Credenciales inválidas. Intenta de nuevo.'
            );
            }

            if (err instanceof Error) {
            const msg = err.message.toLowerCase();

            if (msg.includes('verific')) {
                throw new Error('REDIRECT_VERIFY_EMAIL');
            }

            throw new Error(
                err.message || 'Credenciales inválidas. Intenta de nuevo.'
            );
            }

            throw new Error(
            'No se pudo contactar con el servidor. Intenta más tarde.'
            );
        }
        },

        onSuccess: ({ user }) => {
        qc.invalidateQueries({ queryKey: ['me'] });
        toast.success('¡Bienvenido de nuevo!');

        const route =
            user.roles
            ?.map(r => r.nombre.trim().toLowerCase())
            .find(r => ROLE_ROUTE[r]);

        if (route) {
            navigate(toAbs(ROLE_ROUTE[route]), { replace: true });
        } else {
            toast.error('Rol no reconocido');
            navigate('/', { replace: true });
        }
        },

        onError: (err) => {
        if (err.message === 'REDIRECT_VERIFY_EMAIL') {
            navigate('/verify-email', { replace: true });
            return;
        }
        toast.error(err.message);
        },
    });
};

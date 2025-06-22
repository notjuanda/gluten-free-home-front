import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { User } from '@/modules/admin/types/users.types';
import api from '../api/instance.api';

interface Props {
    children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await api.get<User>('/auth/me');
            setUser(data);
            console.log('Usuario autenticado:', data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback(
        async (correo: string, contraseña: string) => {
            await api.post('/auth/login', { correo, contraseña });
            await refreshProfile();
        },
        [refreshProfile],
    );

    const logout = useCallback(async () => {
        try {
            await api.post('/auth/logout');
            // Limpiar el carrito del localStorage
            localStorage.removeItem('cart_items');
            setUser(null);
        } catch (error) {
            console.error('Error durante el logout:', error);
            // Aún así limpiar el carrito
            localStorage.removeItem('cart_items');
            setUser(null);
        }
    }, []);

    useEffect(() => {
        refreshProfile();
    }, [refreshProfile]);

    const value = {
        user,
        isAuthenticated: Boolean(user),
        loading,
        login,
        logout,
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

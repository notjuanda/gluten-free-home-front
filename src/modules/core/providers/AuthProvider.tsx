import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from '../context/AuthContext';
import type { User } from '../types/user.type';
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
        await api.post('/auth/logout');
        setUser(null);
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

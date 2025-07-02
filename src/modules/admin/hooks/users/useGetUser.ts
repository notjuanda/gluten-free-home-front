import { useState, useEffect } from 'react';
import type { User } from '../../types/users.types';
import { adminUsersApi } from '../../api/users.api';
import type { Role } from '@/modules/core/types/role.type';

export function useGetUser(id?: number) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        adminUsersApi.getById(id)
        .then((res) => {
            const mappedUser = {
                ...res,
                roles: res.roles.map((role: Partial<Role>) => ({
                    id: role.id ?? 0,
                    nombre: role.nombre ?? '',
                    permisos: role.permisos ?? []
                }))
            };
            setUser(mappedUser);
            setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, [id]);

    return { user, loading, error };
}

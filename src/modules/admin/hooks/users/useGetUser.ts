import { useState, useEffect } from 'react';
import type { User } from '@/modules/core/types/user.type';
import { adminUsersApi } from '../../api/users.api';

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
                roles: res.roles.map((role: any) => ({
                    ...role,
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

import { useState, useEffect } from 'react';
import type { User } from '@/modules/core/types/user.type';
import { adminUsersApi } from '../../api/users.api';

export function useGetUsers() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        adminUsersApi.getAll()
        .then((res) => {
            const mappedUsers = res.map((user: any) => ({
                ...user,
                roles: user.roles.map((role: any) => ({
                    ...role,
                    permisos: role.permisos ?? []
                }))
            }));
            setUsers(mappedUsers);
            setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    return { users, loading, error };
}

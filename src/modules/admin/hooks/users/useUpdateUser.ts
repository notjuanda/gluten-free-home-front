import { useState } from 'react';
import type { UpdateUserInput } from '../../types/users.types';
import type { User } from '../../types/users.types';
import { adminUsersApi } from '../../api/users.api';

export function useUpdateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function updateUser(id: number, data: UpdateUserInput): Promise<User | null> {
        setLoading(true);
        try {
        const user = await adminUsersApi.update(id, data);
        setError(null);
        const mappedUser = {
            ...user,
            roles: user.roles.map((role: any) => ({
                ...role,
                permisos: role.permisos ?? []
            }))
        };
        console.log('Mapped User:', mappedUser);
        return mappedUser as User;
        } catch (err: any) {
        setError(err.message);
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { updateUser, loading, error };
}

import { useState } from 'react';
import type { User } from '@/modules/core/types/user.type';
import type { CreateUserInput } from '../../types/users.types';
import { adminUsersApi } from '../../api/users.api';

export function useCreateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function createUser(data: CreateUserInput): Promise<User | null> {
        setLoading(true);
        try {
        const user = await adminUsersApi.create(data);
        setError(null);
        const mappedUser = {
            ...user,
            roles: user.roles.map((role: any) => ({
                ...role,
                permisos: role.permisos ?? []
            }))
        };
        return mappedUser;
        } catch (err: any) {
        setError(err.message);
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { createUser, loading, error };
}

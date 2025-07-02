import { useState } from 'react';
import type { User } from '../../types/users.types';
import type { CreateUserInput } from '../../types/users.types';
import { adminUsersApi } from '../../api/users.api';
import type { Role } from '@/modules/core/types/role.type';

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
        roles: Array.isArray(user.roles)
            ? user.roles.map((role: Partial<Role>) => ({
                id: role.id ?? 0,
                nombre: role.nombre ?? '',
                permisos: role.permisos ?? [],
            }))
            : [],
        };
        console.log('Usuario creado:', mappedUser);
        return mappedUser;
        } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { createUser, loading, error };
}

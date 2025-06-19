import { useState } from 'react';
import type { UpdateUserInput } from '../../types/users.types';
import type { User } from '../../types/users.types';
import { adminUsersApi } from '../../api/users.api';
import type { Role } from '@/modules/core/types/role.type';

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
            roles: user.roles.map((role: Partial<Role>) => ({
                id: role.id ?? 0,
                nombre: role.nombre ?? '',
                permisos: role.permisos ?? []
            }))
        };
        return mappedUser as User;
        } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { updateUser, loading, error };
}

import { useState, useEffect } from 'react';
import type { User } from '../../types/users.types';
import { adminUsersApi } from '../../api/users.api';
import type { Role } from '@/modules/core/types/role.type';

export function useGetUsers() {
    const [users, setUsers] = useState<User[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        adminUsersApi.getAll()
        .then((res) => {
            const mappedUsers = res.map((user: Partial<User>) => ({
                id: user.id ?? 0,
                nombreUsuario: user.nombreUsuario ?? '',
                correo: user.correo ?? '',
                nombreCompleto: user.nombreCompleto ?? '',
                telefono: user.telefono ?? '',
                estadoCorreo: user.estadoCorreo ?? 'NO_VERIFICADO',
                createdAt: user.createdAt ?? '',
                updatedAt: user.updatedAt ?? '',
                roles: (user.roles ?? []).map((role: Partial<Role>) => ({
                    id: role.id ?? 0,
                    nombre: role.nombre ?? '',
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

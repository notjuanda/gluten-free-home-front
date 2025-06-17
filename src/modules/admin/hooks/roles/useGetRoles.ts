import { useState, useEffect } from 'react';
import { getRoles }            from '@/modules/core/api/roles.api';
import type { Role }           from '@/modules/core/types/role.type';

export function useGetRoles() {
    const [roles,   setRoles]   = useState<Role[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getRoles()
        .then((res) => {
            const mapped = res.map((r) => ({
            ...r,
            permisos: r.permisos ?? [],
            }));
            setRoles(mapped);
            setError(null);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    return { roles, loading, error };
}

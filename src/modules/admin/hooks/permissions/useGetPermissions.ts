import { useEffect, useState } from 'react';
import { getPermissions } from '@/modules/core/api/permissions.api';
import type { Permission } from '@/modules/core/types/permission.type';

export function useGetPermissions() {
    const [permissions, setPermissions] = useState<Permission[] | null>(null);
    const [loading,     setLoading]     = useState(true);
    const [error,       setError]       = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        getPermissions()
        .then((data) => {
            setPermissions(data);
            setError(null);
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }, []);

    return { permissions, loading, error };
}

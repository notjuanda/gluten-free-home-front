import { useState } from 'react';
import { updateRole } from '@/modules/core/api/roles.api';
import type { UpdateRoleInput, Role } from '@/modules/core/types/role.type';

export function useUpdateRole() {
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState<string | null>(null);

    async function update(id: number, data: UpdateRoleInput): Promise<Role | null> {
        setLoading(true);
        try {
        const role = await updateRole(id, data);
        setError(null);
        return role;
        } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { update, loading, error };
}

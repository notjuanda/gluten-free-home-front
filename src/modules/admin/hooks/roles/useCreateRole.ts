import { useState } from 'react';
import { createRole } from '@/modules/core/api/roles.api';
import type { CreateRoleInput, Role } from '@/modules/core/types/role.type';

export function useCreateRole() {
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState<string | null>(null);

    async function create(data: CreateRoleInput): Promise<Role | null> {
        setLoading(true);
        try {
        const role = await createRole(data);
        setError(null);
        return role;
        } catch (e: any) {
        setError(e.message);
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { create, loading, error };
}

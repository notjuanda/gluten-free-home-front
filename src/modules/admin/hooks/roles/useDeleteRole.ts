import { useState } from 'react';
import { deleteRole } from '@/modules/core/api/roles.api';

export function useDeleteRole() {
    const [loading, setLoading] = useState(false);
    const [error,   setError]   = useState<string | null>(null);

    async function remove(id: number): Promise<boolean> {
        setLoading(true);
        try {
        await deleteRole(id);
        setError(null);
        return true;
        } catch (e: any) {
        setError(e.message);
        return false;
        } finally {
        setLoading(false);
        }
    }

    return { remove, loading, error };
}

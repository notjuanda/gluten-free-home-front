import { useState } from 'react';
import { adminUsersApi } from '../../api/users.api';

export function useDeleteUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function deleteUser(id: number): Promise<boolean> {
        setLoading(true);
        try {
        await adminUsersApi.remove(id);
        setError(null);
        return true;
        } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        return false;
        } finally {
        setLoading(false);
        }
    }

    return { deleteUser, loading, error };
}

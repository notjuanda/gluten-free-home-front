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
        } catch (err: any) {
        setError(err.message);
        return false;
        } finally {
        setLoading(false);
        }
    }

    return { deleteUser, loading, error };
}

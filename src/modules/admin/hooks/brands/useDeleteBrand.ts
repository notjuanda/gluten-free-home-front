import { useState } from 'react';
import { deleteBrand } from '@/modules/core/api/brand.api';

export function useDeleteBrand() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function remove(id: number): Promise<boolean> {
        setLoading(true);
        try {
            await deleteBrand(id);
            setError(null);
            return true;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error desconocido');
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { deleteBrand: remove, loading, error };
} 
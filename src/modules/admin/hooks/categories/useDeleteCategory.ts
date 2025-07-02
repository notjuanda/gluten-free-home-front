import { useState } from 'react';
import { deleteProductCategory } from '@/modules/core/api/product-category.api';

export function useDeleteCategory() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function remove(id: number): Promise<boolean> {
        setLoading(true);
        try {
            await deleteProductCategory(id);
            setError(null);
            return true;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error desconocido');
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { deleteCategory: remove, loading, error };
} 
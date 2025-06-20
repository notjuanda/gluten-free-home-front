import { useState } from 'react';
import { deleteProduct } from '@/modules/core/api/products.api';

export function useDeleteProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function remove(id: number): Promise<boolean> {
        setLoading(true);
        setError(null);
        try {
        await deleteProduct(id);
        return true;
        } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error al eliminar el producto');
        return false;
        } finally {
        setLoading(false);
        }
    }

    return { deleteProduct: remove, loading, error };
} 
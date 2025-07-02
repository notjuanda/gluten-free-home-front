import { useState } from 'react';
import { updateProduct } from '@/modules/core/api/products.api';
import type { UpdateProductInput, Product } from '@/modules/core/types/product.type';

export function useUpdateProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function update(id: number, data: UpdateProductInput): Promise<Product | null> {
        setLoading(true);
        setError(null);
        try {
        const product = await updateProduct(id, data);
        return product;
        } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error al actualizar el producto');
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { update, loading, error };
} 
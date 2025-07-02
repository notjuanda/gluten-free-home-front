import { useState } from 'react';
import { createProduct } from '@/modules/core/api/products.api';
import type { CreateProductInput, Product } from '@/modules/core/types/product.type';

export function useCreateProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function createProductAction(data: CreateProductInput): Promise<Product | null> {
        setLoading(true);
        try {
        const product = await createProduct(data);
        setError(null);
        return product;
        } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { createProduct: createProductAction, loading, error };
} 
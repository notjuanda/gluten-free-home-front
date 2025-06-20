import { useState, useCallback } from 'react';
import { getProduct } from '@/modules/core/api/products.api';
import type { Product } from '@/modules/core/types/product.type';

export function useGetProduct() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
        const data = await getProduct(id);
        setProduct(data);
        } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error al obtener el producto');
        } finally {
        setLoading(false);
        }
    }, []);

    return { product, loading, error, refetch: fetchProduct };
} 
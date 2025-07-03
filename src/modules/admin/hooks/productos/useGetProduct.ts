import { useState, useCallback } from 'react';
import { getProductBySlug, getProduct } from '@/modules/core/api/products.api';
import type { Product } from '@/modules/core/types/product.type';

export function useGetProduct() {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProduct = useCallback(async (idOrSlug: number | string) => {
        setLoading(true);
        setError(null);
        try {
            let data: Product;
            if (typeof idOrSlug === 'number') {
                data = await getProduct(idOrSlug);
            } else {
                data = await getProductBySlug(idOrSlug);
            }
            setProduct(data);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error al obtener el producto');
        } finally {
            setLoading(false);
        }
    }, []);

    return { product, loading, error, refetch: fetchProduct };
} 
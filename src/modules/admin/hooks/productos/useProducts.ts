import { useEffect, useState, useCallback } from 'react';
import type { Product } from '@/modules/core/types/product.type';
import { getProducts } from '@/modules/core/api/products.api';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(() => {
        setLoading(true);
        getProducts()
        .then(setProducts)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, error, refetch: fetchProducts };
} 
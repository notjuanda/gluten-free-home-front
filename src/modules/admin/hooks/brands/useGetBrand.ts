import { useState, useCallback } from 'react';
import { getBrand } from '@/modules/core/api/brand.api';
import type { Brand } from '@/modules/core/types/brand.type';

export function useGetBrand() {
    const [brand, setBrand] = useState<Brand | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBrand = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
        const data = await getBrand(id);
        setBrand(data);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error al obtener la marca');;
        } finally {
        setLoading(false);
        }
    }, []);

    return { brand, loading, error, refetch: fetchBrand };
} 
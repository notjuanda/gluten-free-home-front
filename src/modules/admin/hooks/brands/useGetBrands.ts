import { useEffect, useState, useCallback } from 'react';
import { getBrands } from '@/modules/core/api/brand.api';
import type { Brand } from '@/modules/core/types/brand.type';

export function useGetBrands() {
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBrands = useCallback(() => {
        setLoading(true);
        getBrands()
            .then((data) => {
                setBrands(data);
                setError(null);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    return { brands, loading, error, refetch: fetchBrands };
} 
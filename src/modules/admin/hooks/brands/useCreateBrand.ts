import { useState } from 'react';
import { createBrand } from '@/modules/core/api/brand.api';
import type { CreateBrandInput, Brand } from '@/modules/core/types/brand.type';

export function useCreateBrand() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function createBrandAction(data: CreateBrandInput): Promise<Brand | null> {
        setLoading(true);
        try {
            const brand = await createBrand(data);
            setError(null);
            return brand;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error desconocido');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { createBrand: createBrandAction, loading, error };
} 
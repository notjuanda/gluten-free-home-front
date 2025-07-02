import { useState } from 'react';
import { updateBrand } from '@/modules/core/api/brand.api';
import type { UpdateBrandInput, Brand } from '@/modules/core/types/brand.type';

export function useUpdateBrand() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function update(id: number, data: UpdateBrandInput): Promise<Brand | null> {
        setLoading(true);
        setError(null);
        try {
        const brand = await updateBrand(id, data);
        return brand;
        } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Error al actualizar la marca');
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { update, loading, error };
} 
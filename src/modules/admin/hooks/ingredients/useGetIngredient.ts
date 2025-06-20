import { useState, useCallback } from 'react';
import { getIngredient } from '@/modules/core/api/ingredients.api';
import type { Ingredient } from '@/modules/core/types/ingredient.type';

export function useGetIngredient() {
    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchIngredient = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
        const data = await getIngredient(id);
        setIngredient(data);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error al obtener el ingrediente');
        } finally {
        setLoading(false);
        }
    }, []);

    return { ingredient, loading, error, refetch: fetchIngredient };
} 
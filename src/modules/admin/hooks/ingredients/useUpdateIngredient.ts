import { useState } from 'react';
import { updateIngredient } from '@/modules/core/api/ingredients.api';
import type { UpdateIngredientInput, Ingredient } from '@/modules/core/types/ingredient.type';

export function useUpdateIngredient() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function updateIngredientFn(id: number, data: UpdateIngredientInput): Promise<Ingredient | null> {
        setLoading(true);
        setError(null);
        try {
        const ingredient = await updateIngredient(id, data);
        return ingredient;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error al actualizar el ingrediente');
        return null;
        } finally {
        setLoading(false);
        }
    }

    return { updateIngredient: updateIngredientFn, loading, error };
} 
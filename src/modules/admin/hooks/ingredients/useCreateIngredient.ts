import { useState } from 'react';
import { createIngredient } from '@/modules/core/api/ingredients.api';
import type { CreateIngredientInput, Ingredient } from '@/modules/core/types/ingredient.type';

export function useCreateIngredient() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function createIngredientAction(data: CreateIngredientInput): Promise<Ingredient | null> {
        setLoading(true);
        try {
            const ingredient = await createIngredient(data);
            setError(null);
            return ingredient;
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error desconocido');
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { createIngredient: createIngredientAction, loading, error };
} 
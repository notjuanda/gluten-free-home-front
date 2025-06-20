import { useEffect, useState, useCallback } from 'react';
import { getIngredients } from '@/modules/core/api/ingredients.api';
import type { Ingredient } from '@/modules/core/types/ingredient.type';

export function useGetIngredients() {
    const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchIngredients = useCallback(() => {
        setLoading(true);
        getIngredients()
            .then((data) => {
                setIngredients(data);
                setError(null);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]);

    return { ingredients, loading, error, refetch: fetchIngredients };
} 
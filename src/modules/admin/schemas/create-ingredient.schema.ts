import { z } from 'zod';

export const createIngredientSchema = z.object({
    nombre: z.string().min(2, 'El nombre es requerido y debe tener al menos 2 caracteres'),
});

export type CreateIngredientSchema = z.infer<typeof createIngredientSchema>; 
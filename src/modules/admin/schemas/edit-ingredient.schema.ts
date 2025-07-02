import { z } from 'zod';

export const editIngredientSchema = z.object({
    nombre: z.string().min(2, 'El nombre es obligatorio').optional(),
});

export type EditIngredientSchema = z.infer<typeof editIngredientSchema>; 
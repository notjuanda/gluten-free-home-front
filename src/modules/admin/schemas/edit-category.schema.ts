import { z } from 'zod';

export const editCategorySchema = z.object({
    nombre: z.string().min(2, 'El nombre es obligatorio').optional(),
    slug: z.string().min(2, 'El slug es obligatorio').optional(),
});

export type EditCategorySchema = z.infer<typeof editCategorySchema>; 
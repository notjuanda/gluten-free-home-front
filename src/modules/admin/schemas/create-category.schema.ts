import { z } from 'zod';

export const createCategorySchema = z.object({
    nombre: z.string().min(2, 'El nombre es requerido y debe tener al menos 2 caracteres'),
    slug: z.string().min(2, 'El slug es requerido y debe tener al menos 2 caracteres').regex(/^[-a-zA-Z0-9]+$/, 'El slug no debe tener espacios ni caracteres especiales'),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>; 
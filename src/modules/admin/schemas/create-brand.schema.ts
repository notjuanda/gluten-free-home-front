import { z } from 'zod';

export const createBrandSchema = z.object({
    nombre: z.string().min(2, 'El nombre es requerido y debe tener al menos 2 caracteres'),
});

export type CreateBrandSchema = z.infer<typeof createBrandSchema>; 
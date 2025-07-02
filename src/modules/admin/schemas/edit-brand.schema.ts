import { z } from 'zod';

export const editBrandSchema = z.object({
    nombre: z.string().min(2, 'El nombre es obligatorio').optional(),
});

export type EditBrandSchema = z.infer<typeof editBrandSchema>; 
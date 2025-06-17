import { z } from 'zod';

export const loginSchema = z.object({
    correo: z
        .string()
        .min(1, 'El correo es requerido')
        .email('Debe ser un correo válido'),

    contraseña: z
        .string()
        .min(1, 'La contraseña es requerida'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

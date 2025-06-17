import { z } from 'zod';

export const registerSchema = z.object({
    nombreUsuario: z
        .string()
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),

    correo: z.string().email('Debe ser un correo válido'),

    contraseña: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),

    nombreCompleto: z
        .string()
        .max(100, 'Máximo 100 caracteres')
        .optional()
        .or(z.literal('')),

    telefono: z
        .string()
        .regex(/^\+?[0-9\s\-]{6,20}$/, 'Teléfono no válido')
        .optional()
        .or(z.literal('')),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

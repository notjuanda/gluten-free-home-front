import { z } from 'zod';

export const editProductSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio').optional(),
    slug: z.string().min(1, 'El slug es obligatorio').optional(),
    descripcion: z.string().optional(),
    precioBob: z.number().positive('El precio debe ser positivo').optional(),
    precioUsd: z.number().positive('El precio debe ser positivo').optional(),
    stock: z.number().positive('El stock debe ser positivo').optional(),
    activo: z.boolean().optional(),
    certificadoSinGluten: z.boolean().optional(),
    urlCertificado: z.string().optional(),
    marcaId: z.preprocess(
        (v) => v === '' || v === undefined ? undefined : Number(v),
        z.number().optional()
    ),
    categoriaId: z.number().optional(),
    ingredientesIds: z.array(z.number()).optional(),
});

export type EditProductSchema = z.infer<typeof editProductSchema>; 
import { z } from 'zod';

export const createProductSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
    slug: z.string().min(1, 'El slug es obligatorio'),
    descripcion: z.string().optional(),
    precioBob: z.number().positive('El precio debe ser positivo'),
    precioUsd: z.number().positive('El precio debe ser positivo').optional(),
    stock: z.number().positive('El stock debe ser positivo').optional(),
    activo: z.boolean().optional(),
    certificadoSinGluten: z.boolean().optional(),
    urlCertificado: z.string().optional(),
    marcaId: z.preprocess(
        (v) => v === '' || v === undefined ? undefined : Number(v),
        z.number().optional()
    ),
    categoriaId: z.number({ required_error: 'La categoría es obligatoria' }),
    ingredientesIds: z.preprocess(
        (v) => {
            if (typeof v === 'string') {
                if (v.trim() === '') return undefined;
                return v.split(',').map((id) => Number(id.trim())).filter(Boolean);
            }
            return v;
        },
        z.array(z.number()).optional()
    ),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>; 
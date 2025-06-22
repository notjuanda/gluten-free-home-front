import { z } from 'zod';

export const addressSchema = z.object({
    linea1: z.string().min(5, 'La dirección es muy corta').max(100, 'La dirección es muy larga'),
    linea2: z.string().max(100, 'La referencia es muy larga').optional(),
    ciudad: z.string().min(3, 'El nombre de la ciudad es muy corto').max(50, 'El nombre de la ciudad es muy largo'),
    departamento: z.string().min(3, 'El nombre del departamento es muy corto').max(50, 'El nombre del departamento es muy largo'),
    codigoPostal: z.string().max(10, 'El código postal es muy largo').optional(),
    pais: z.string().min(3, 'El nombre del país es muy corto').max(50, 'El nombre del país es muy largo').default('Bolivia'),
});

export type AddressSchema = z.infer<typeof addressSchema>; 
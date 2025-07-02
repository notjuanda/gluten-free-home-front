import { z } from 'zod';

export const roleSchema = z.object({
    nombre:      z.string().min(1, 'El nombre es obligatorio'),
    permisosIds: z
        .array(z.number({ invalid_type_error: 'Permiso inválido' }))
        .nonempty('Selecciona al menos un permiso')
});

export type RoleFormSchema = z.infer<typeof roleSchema>;

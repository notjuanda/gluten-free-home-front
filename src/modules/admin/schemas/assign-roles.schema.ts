import { z } from 'zod';

/** Validación del formulario de asignación de roles */
export const assignRolesSchema = z.object({
  rolesIds: z
    .array(z.number(), {
      invalid_type_error: 'Rol inválido',
      required_error:     'Selecciona al menos un rol',
    })
    .min(1, 'Selecciona al menos un rol'),
});

export type AssignRolesSchema = z.infer<typeof assignRolesSchema>;

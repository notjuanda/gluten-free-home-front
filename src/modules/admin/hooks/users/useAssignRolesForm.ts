import { useEffect } from 'react';
import { useForm }            from 'react-hook-form';
import { zodResolver }        from '@hookform/resolvers/zod';

import {
    assignRolesSchema,
    type AssignRolesSchema,
} from '@/modules/admin/schemas/assign-roles.schema';

import { useUpdateUser }  from '@/modules/admin/hooks/users/useUpdateUser';
import { useGetRoles }    from '@/modules/admin/hooks/roles/useGetRoles';
import type { User }      from '@/modules/admin/types/users.types';
import { adminUsersApi } from '@/modules/admin/api/users.api';

export function useAssignRolesForm(
    user: User,
    onUpdated?: (u: User) => void,
    onClose?: () => void,
    ) {
    const { updateUser, loading: updating, error } = useUpdateUser();
    const { roles, loading: rolesLoading }         = useGetRoles();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AssignRolesSchema>({
        resolver: zodResolver(assignRolesSchema),
        defaultValues: { rolesIds: [] },
    });

    useEffect(() => {
        if (onClose && !onClose)
        if (user && !rolesLoading && roles?.length) {
        reset({ rolesIds: user.roles.map((r) => r.id) });
        }
    }, [user, rolesLoading, roles, reset, onClose]);

    const onSubmit = handleSubmit(async (values) => {
        const updated = await updateUser(user.id, { rolesIds: values.rolesIds });
        if (updated) {
         // Forzar recarga del usuario para obtener el updatedAt correcto
            try {
            const freshUser = await adminUsersApi.getById(user.id);
            onUpdated?.(freshUser);
            } catch {
            // Si falla, al menos actualiza con el usuario anterior
            onUpdated?.(updated);
            }
            onClose?.();
            }
    });

    const busy = updating || rolesLoading;

    return {
        roles,
        error,
        errors,
        busy,
        control,
        onSubmit,
    };
}

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    Autocomplete,
    CircularProgress,
    Alert
} from '@mui/material';
import { ActionButton } from '@/shared/ui/ActionButton';
import { useGetPermissions } from '../../hooks/permissions/useGetPermissions';
import {
    roleSchema,
    type RoleFormSchema
} from '@/modules/admin/schemas/role.schema';
import type { RoleFormProps } from '@/modules/admin/types/role-form.type';

export default function RoleForm({
    defaultValues,
    loadingSubmit,
    errorSubmit,
    onSubmit,
    onCancel
}: RoleFormProps) {
    const {
        permissions,
        loading: loadingPerms,
        error: errorPerms
    } = useGetPermissions();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RoleFormSchema>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            nombre: defaultValues?.nombre ?? '',
            permisosIds: defaultValues?.permisos?.map(p => p.id) ?? []
        }
    });

    useEffect(() => {
        if (defaultValues) {
            reset({
                nombre: defaultValues.nombre ?? '',
                permisosIds: defaultValues.permisos?.map(p => p.id) ?? []
            });
        }
    }, [defaultValues, reset]);

    return (
        <form className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
            {errorSubmit && <Alert severity="error">{errorSubmit}</Alert>}
            {errorPerms && <Alert severity="error">{errorPerms}</Alert>}

            <Controller
                name="nombre"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Nombre del rol"
                        fullWidth
                        required
                        error={Boolean(errors.nombre)}
                        helperText={errors.nombre?.message}
                    />
                )}
            />

            <Controller
                name="permisosIds"
                control={control}
                render={({ field }) => (
                    <Autocomplete
                        multiple
                        options={permissions ?? []}
                        getOptionLabel={opt =>
                            typeof opt === 'string' ? opt : opt.clavePermiso
                        }
                        disableCloseOnSelect
                        loading={loadingPerms}
                        value={(permissions ?? []).filter(p =>
                            field.value.includes(p.id)
                        )}
                        onChange={(_, value) => field.onChange(value.map(v => v.id))}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Permisos"
                                placeholder="Buscar permiso…"
                                error={Boolean(errors.permisosIds)}
                                helperText={errors.permisosIds?.message}
                            />
                        )}
                        renderOption={(props, option) => (
                            <li {...props} key={option.id}>
                                {option.clavePermiso}
                            </li>
                        )}
                    />
                )}
            />

            <div className="flex justify-end gap-4">
                <ActionButton variant="secondary" onClick={onCancel}>
                    Cancelar
                </ActionButton>
                <ActionButton
                    variant="primary"
                    loading={loadingSubmit}
                    iconLeft={
                        loadingSubmit ? <CircularProgress size={16} color="inherit" /> : null
                    }
                    onClick={handleSubmit(onSubmit)}
                >
                    Guardar
                </ActionButton>
            </div>
        </form>
    );
}

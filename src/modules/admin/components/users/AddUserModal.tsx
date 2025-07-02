import { useState } from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { useCreateUser } from '@/modules/admin/hooks/users/useCreateUser';
import { FormModal } from '@/shared/ui/FormModal';
import type { FormField } from '@/shared/types/form-modal.types';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    createUserSchema,
    type CreateUserSchema,
} from '../../schemas/create-user.schema';
import type { AddUserModalProps } from '../../types/users-components.type';

export default function AddUserModal({ onCreated }: AddUserModalProps) {
    const [open, setOpen] = useState(false);
    const { createUser, loading, error } = useCreateUser();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateUserSchema>({
        resolver: zodResolver(createUserSchema),
    });

    const fields: FormField[] = [
        { name: 'nombreUsuario', label: 'Nombre de Usuario', type: 'text', required: true },
        { name: 'correo', label: 'Correo Electrónico', type: 'email', required: true },
        { name: 'contraseña', label: 'Contraseña', type: 'password', required: true },
        { name: 'nombreCompleto', label: 'Nombre Completo', type: 'text' },
        { name: 'telefono', label: 'Teléfono', type: 'text' },
    ];

    const handleValidSubmit = async (data: CreateUserSchema) => {
        const created = await createUser(data);
        if (created) {
            onCreated?.(created);
            setOpen(false);
            reset();
        }
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                title="Crear usuario"
                className="text-button hover:text-highlight transition-colors"
            >
                <FiUserPlus size={24} />
            </button>

            {open && (
                <FormModal
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        reset();
                    }}
                    title="Agregar Nuevo Usuario"
                    fields={fields}
                    onSubmit={handleSubmit(handleValidSubmit)}
                    register={register}
                    fieldErrors={Object.fromEntries(
                        Object.entries(errors).map(([key, val]) => [key, val.message ?? ''])
                    )}
                    loading={loading}
                    error={error ?? undefined}
                    submitText="Guardar Usuario"
                />
            )}
        </>
    );
}

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';

import { useRegister } from '../hooks/useRegister';
import {
    registerSchema,
    type RegisterSchema,
} from '../schemas/register.schema';

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
    });

    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { mutate: registerUser, isPending } = useRegister();

    const onSubmit = (values: RegisterSchema) => {
        setSubmitting(true);
        setServerError('');

        registerUser(values, {
            onSuccess: () => {
                navigate('/verify-email');
            },
            onError: (err) => {
                setServerError(err.message);
            },
            onSettled: () => setSubmitting(false),
        });
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 text-foreground"
        >
            {serverError && (
                <p className="rounded-md bg-destructive px-4 py-2 text-sm text-white shadow-sm">
                    {serverError}
                </p>
            )}

            <div>
                <label className="mb-1 block text-sm">Nombre de Usuario</label>
                <input
                    type="text"
                    {...register('nombreUsuario')}
                    className={clsx(
                        'w-full rounded-md bg-white px-4 py-2 text-black outline-none transition-shadow',
                        errors.nombreUsuario && 'ring-2 ring-destructive'
                    )}
                />
                {errors.nombreUsuario && (
                    <p className="mt-1 text-xs text-destructive-foreground">
                        {errors.nombreUsuario.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex-1">
                    <label className="mb-1 block text-sm">Nombre Completo</label>
                    <input
                        type="text"
                        {...register('nombreCompleto')}
                        className={clsx(
                            'w-full rounded-md bg-white px-4 py-2 text-black outline-none transition-shadow',
                            errors.nombreCompleto && 'ring-2 ring-destructive'
                        )}
                    />
                    {errors.nombreCompleto && (
                        <p className="mt-1 text-xs text-destructive-foreground">
                            {errors.nombreCompleto.message}
                        </p>
                    )}
                </div>

                <div className="flex-1">
                    <label className="mb-1 block text-sm">Teléfono</label>
                    <input
                        type="text"
                        {...register('telefono')}
                        className={clsx(
                            'w-full rounded-md bg-white px-4 py-2 text-black outline-none transition-shadow',
                            errors.telefono && 'ring-2 ring-destructive'
                        )}
                    />
                    {errors.telefono && (
                        <p className="mt-1 text-xs text-destructive-foreground">
                            {errors.telefono.message}
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm">Correo Electrónico</label>
                <input
                    type="email"
                    {...register('correo')}
                    className={clsx(
                        'w-full rounded-md bg-white px-4 py-2 text-black outline-none transition-shadow',
                        errors.correo && 'ring-2 ring-destructive'
                    )}
                />
                {errors.correo && (
                    <p className="mt-1 text-xs text-destructive-foreground">
                        {errors.correo.message}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-1 block text-sm">Contraseña</label>
                <input
                    type="password"
                    {...register('contraseña')}
                    className={clsx(
                        'w-full rounded-md bg-white px-4 py-2 text-black outline-none transition-shadow',
                        errors.contraseña && 'ring-2 ring-destructive'
                    )}
                />
                {errors.contraseña && (
                    <p className="mt-1 text-xs text-destructive-foreground">
                        {errors.contraseña.message}
                    </p>
                )}
            </div>

            <Link
                to="/login"
                className="self-end text-xs underline text-foreground hover:opacity-80 transition-opacity"
            >
                ¿Ya tienes una cuenta?
            </Link>

            <button
                type="submit"
                disabled={submitting || isPending}
                className="rounded-full bg-button text-white px-6 py-2 font-cap-medium uppercase tracking-wide
                    transition-opacity hover:bg-button/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {submitting ? 'Registrando…' : 'Registrar'}
            </button>
        </form>
    );
}

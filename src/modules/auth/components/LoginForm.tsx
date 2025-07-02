import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { useLogin } from '../hooks/useLogin';
import { loginSchema, type LoginSchema } from '../schemas/login.schema';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const {
        mutate: login,
        isPending,
        error: serverErr,
    } = useLogin();

    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (values: LoginSchema) => {
        setSubmitting(true);
        login(values, { onSettled: () => setSubmitting(false) });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {serverErr && (
            <p className="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
            {serverErr.message}
            </p>
        )}

        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="email">
                Correo electrónico
            </label>
            <input
                id="email"
                type="email"
                {...register('correo')}
                className={clsx(
                'w-full rounded-md bg-input px-4 py-2 text-foreground outline-none transition-shadow',
                errors.correo && 'ring-2 ring-destructive'
                )}
            />
            {errors.correo && (
            <p className="mt-1 text-xs text-destructive">
            {errors.correo.message}
            </p>
            )}
        </div>

        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" htmlFor="password">
                Contraseña
            </label>
            <input
                id="password"
                type="password"
                {...register('contraseña')}
                className={clsx(
                'w-full rounded-md bg-input px-4 py-2 text-foreground outline-none transition-shadow',
                errors.contraseña && 'ring-2 ring-destructive'
                )}
            />
            {errors.contraseña && (
            <p className="mt-1 text-xs text-destructive">
            {errors.contraseña.message}
            </p>
            )}
        </div>

        <Link
            to="/olvido-contraseña"
            className="self-end text-xs underline text-foreground transition-opacity hover:opacity-80"
        >
            ¿Olvidaste tu contraseña?
        </Link>

        <button
            type="submit"
            disabled={submitting || isPending}
            className="rounded-full bg-secondary px-6 py-2 font-cap-medium uppercase tracking-wide
                text-secondary-foreground transition-opacity hover:bg-secondary/90
                disabled:cursor-not-allowed disabled:opacity-60"
        >
            {submitting ? 'Cargando…' : 'Continuar'}
        </button>
        </form>
    );
}

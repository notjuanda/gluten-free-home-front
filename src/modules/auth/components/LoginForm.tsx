import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

import {
    loginSchema,
    type LoginSchema,
} from '../schemas/login.schema';

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const { mutate: login, isPending } = useLogin();
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (values: LoginSchema) => {
        setSubmitting(true);
        login(values, {
        onSettled: () => setSubmitting(false),
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
            <label className="mb-1 block text-sm text-foreground">Correo Electrónico</label>
            <input
            type="email"
            {...register('correo')}
            className={clsx(
                'w-full rounded-md bg-white px-4 py-2 text-black outline-none transition-shadow',
                errors.correo && 'ring-2 ring-destructive'
            )}
            />
            {errors.correo && (
            <p className="mt-1 text-xs text-destructive-foreground">{errors.correo.message}</p>
            )}
        </div>

        <div>
            <label className="mb-1 block text-sm text-foreground">Contraseña</label>
            <input
            type="password"
            {...register('contraseña')}
            className={clsx(
                'w-full rounded-md bg-white px-4 py-2 text-black outline-none transition-shadow',
                errors.contraseña && 'ring-2 ring-destructive'
            )}
            />
            {errors.contraseña && (
            <p className="mt-1 text-xs text-destructive-foreground">{errors.contraseña.message}</p>
            )}
        </div>

        <Link
            to="/olvido-contraseña"
            className="self-end text-xs underline text-foreground hover:opacity-80 transition-opacity"
        >
            ¿Olvidaste tu contraseña?
        </Link>

        <button
            type="submit"
            disabled={submitting || isPending}
            className="rounded-md bg-button px-6 py-2 font-cap-medium uppercase tracking-wide
                    transition-opacity hover:bg-button/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {submitting ? 'Cargando…' : 'Continuar'}
        </button>
        </form>
    );
}

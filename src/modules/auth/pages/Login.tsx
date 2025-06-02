import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { useLogin } from '../hooks/useLogin';
import type { LoginRequest } from '../types/auth.types';

import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const LoginPage = () => {
  const { register, handleSubmit, formState:{errors} } = useForm<LoginRequest>();
  const { mutate: login, isPending } = useLogin();
  const [submitting,setSubmitting] = useState(false);

  const onSubmit = (values: LoginRequest) => {
    setSubmitting(true);
    login(values, { onSettled: () => setSubmitting(false) });
  };

  return (
    <div className="flex min-h-screen bg-black">
      <div className="hidden basis-[50%] items-center justify-center bg-header md:flex">
        <img
          src="/logo-gluten-free-home.png"
          alt="Gluten-Free Home"
          className="h-72 w-72 rounded-full object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-8 bg-[#5f9072] px-8 py-12 text-white md:basis-[50%] md:px-14">
        <h1 className="text-center text-3xl font-bold md:text-4xl">
          ¡Bienvenido de nuevo!
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <label className="mb-1 block text-sm">Correo Electrónico</label>
            <input
              type="email"
              {...register('correo',{ required:'Ingresa tu correo' })}
              className={clsx(
                'w-full rounded-md bg-white px-4 py-2 text-black outline-none',
                errors.correo && 'ring-2 ring-red-400'
              )}
            />
            {errors.correo && <p className="mt-1 text-xs text-red-200">{errors.correo.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm">Contraseña</label>
            <input
              type="password"
              {...register('contraseña',{ required:'Ingresa tu contraseña' })}
              className={clsx(
                'w-full rounded-md bg-white px-4 py-2 text-black outline-none',
                errors.contraseña && 'ring-2 ring-red-400'
              )}
            />
            {errors.contraseña && <p className="mt-1 text-xs text-red-200">{errors.contraseña.message}</p>}
          </div>

          <Link
            to="/olvido-contraseña"
            className="self-end text-xs underline transition-opacity hover:opacity-80"
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

        <div className="flex items-center gap-4 text-sm">
          <span className="flex-1 border-b border-white/40" />
          o continuar con
          <span className="flex-1 border-b border-white/40" />
        </div>

        <div className="flex justify-center gap-6 text-2xl">
          <FaGoogle     className="opacity-80" />
          <FaFacebookF  className="opacity-80" />
          <FaLinkedinIn className="opacity-80" />
        </div>

        <p className="text-center text-sm">
          ¿Eres nuevo?
          <Link to="/registro" className="ml-1 underline hover:opacity-80">
            Crea una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

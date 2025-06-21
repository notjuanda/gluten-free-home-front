import { LoginForm } from '../components/LoginForm';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden basis-[50%] items-center justify-center bg-primary md:flex">
        <img
          src="/logo-gluten-free-home.png"
          alt="Gluten-Free Home"
          className="h-72 w-72 rounded-full object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-8 bg-card px-8 py-12 text-card-foreground md:basis-[50%] md:px-14">
        <h1 className="text-center text-3xl font-bold md:text-4xl">
          ¡Bienvenido de nuevo!
        </h1>

        <LoginForm />

        <div className="flex items-center gap-4 text-sm">
          <span className="flex-1 border-b border-muted-foreground/40" />
          o continuar con
          <span className="flex-1 border-b border-muted-foreground/40" />
        </div>

        <div className="flex justify-center gap-6 text-2xl">
          <FaGoogle className="opacity-80" />
          <FaFacebookF className="opacity-80" />
          <FaLinkedinIn className="opacity-80" />
        </div>

        <p className="text-center text-sm">
          ¿Eres nuevo?
          <Link to="/register" className="ml-1 underline hover:opacity-80">
            Crea una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

import { RegisterForm } from '../components/RegisterForm';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const RegisterPage = () => {
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
            ¡Bienvenido!
            </h1>

            <RegisterForm />

            <div className="flex items-center gap-4 text-sm">
            <span className="flex-1 border-b border-white/40" />
            o continuar con
            <span className="flex-1 border-b border-white/40" />
            </div>

            <div className="flex justify-center gap-6 text-2xl">
            <FaGoogle className="opacity-80" />
            <FaFacebookF className="opacity-80" />
            <FaLinkedinIn className="opacity-80" />
            </div>

            <p className="text-center text-sm">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="ml-1 underline hover:opacity-80">
                Inicia sesión
            </Link>
            </p>
        </div>
        </div>
    );
};

export default RegisterPage;

import { CiFaceFrown } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            {/* Icono con mejor tamaño y color */}
            <CiFaceFrown className="text-8xl text-gray-600 mb-4" />

            {/* Mensaje de error estilizado */}
            <h1 className="text-4xl font-bold text-gray-800">Página no encontrada</h1>
            <p className="text-gray-500 mt-2 text-lg">
                Lo sentimos, la página que buscas no existe.
            </p>

            {/* Botón estilizado para volver al inicio */}
            <Link
                to="/"
                className="mt-6 bg-cap-yellow text-sm text-cap-blue-2 font-cap-link uppercase px-6 py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
                Volver al inicio
            </Link>
        </div>
    );
}

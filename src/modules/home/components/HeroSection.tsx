import React from 'react';
import { NavLink } from 'react-router-dom';

const HeroSection: React.FC = () => (
    <section className="relative w-full overflow-hidden rounded-lg">
        {/* Imagen de fondo */}
        <img
        src="/public/mezcla-de-alergenos-alimentarios-comunes-para-las-personas.jpg"
        alt="Productos sin gluten"
        className="h-[350px] w-full object-cover md:h-[420px] lg:h-[500px]"
        />

        {/* Capa oscura 60 % */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 text-white md:px-14">
        <h1 className="font-cap font-cap-hero text-3xl leading-snug md:text-5xl">
            <span className="block">Bienvenido a</span>
            <span >Gluten Free Home</span>
        </h1>

        <p className="mt-4 max-w-md font-cap font-cap-medium text-sm md:mt-6 md:text-lg">
            Tu tienda libre de Gluten de confianza con productos certificados y de
            alta calidad. Visita nuestra tienda virtual para ver todos nuestros
            productos ahora mismo.
        </p>

        <NavLink to="/tienda" className="mt-6 w-max">
            <button className="rounded-md bg-button px-6 py-2 font-cap font-cap-medium text-white transition hover:opacity-90">
            ¡Visita la tienda!
            </button>
        </NavLink>
        </div>
    </section>
);

export default HeroSection;

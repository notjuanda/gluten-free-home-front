import React from 'react';
import { NavLink } from 'react-router-dom';
import OptimizedImage from '../../../shared/components/OptimizedImage';

const HeroSection: React.FC = () => {
    return (
        <section className="relative w-full overflow-hidden rounded-lg">
            {/* Imagen de fondo optimizada con responsive images */}
            <picture>
                <source 
                    media="(max-width: 480px)" 
                    srcSet="/optimized/mezcla-de-alergenos-alimentarios-comunes-para-las-personas-small.webp" 
                />
                <source 
                    media="(max-width: 768px)" 
                    srcSet="/optimized/mezcla-de-alergenos-alimentarios-comunes-para-las-personas-medium.webp" 
                />
                <source 
                    media="(max-width: 1024px)" 
                    srcSet="/optimized/mezcla-de-alergenos-alimentarios-comunes-para-las-personas-large.webp" 
                />
                <source 
                    media="(max-width: 1920px)" 
                    srcSet="/optimized/mezcla-de-alergenos-alimentarios-comunes-para-las-personas-xlarge.webp" 
                />
                <OptimizedImage
                    src="/optimized/mezcla-de-alergenos-alimentarios-comunes-para-las-personas.webp"
                    alt="Productos sin gluten"
                    className="h-[350px] w-full md:h-[420px] lg:h-[500px]"
                    loading="eager"
                    sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1920px) 1920px, 100vw"
                />
            </picture>

            {/* Capa oscura 60 % */}
            <div className="absolute inset-0 bg-foreground/70" />

            {/* Contenido */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 text-background md:px-14">
                <h1 className="font-cap font-cap-hero text-3xl leading-snug md:text-5xl">
                    <span className="block">Bienvenido a</span>
                    <span>Gluten Free Home</span>
                </h1>

                <p className="mt-4 max-w-md font-cap font-cap-medium text-sm md:mt-6 md:text-lg">
                    Tu tienda libre de Gluten de confianza con productos certificados y de
                    alta calidad. Visita nuestra tienda virtual para ver todos nuestros
                    productos ahora mismo.
                </p>

                <NavLink to="/explorar" className="mt-6 w-max">
                    <button className="rounded-md bg-secondary px-6 py-2 font-cap font-cap-medium text-secondary-foreground transition hover:brightness-110">
                        ¡Visita la tienda!
                    </button>
                </NavLink>
            </div>
        </section>
    );
};

export default HeroSection;

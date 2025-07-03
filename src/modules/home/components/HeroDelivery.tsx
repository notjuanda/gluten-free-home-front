import type { ReactElement } from 'react';
import OptimizedImage from '../../../shared/components/OptimizedImage';

interface Card {
    eyebrow: string;
    title: string;
    text: string;
}

const CARDS: Card[] = [
    {
        eyebrow: 'Entrega exprés',
        title: 'Recibe tu pedido en 24 h',
        text:
        'Hacemos envíos súper rápidos a todo el país. Pide hoy antes del mediodía y tendrás tus productos libres de gluten en la puerta de tu casa al día siguiente.'
    },
    {
        eyebrow: 'Calidad garantizada',
        title: 'Certificados sin gluten',
        text:
        'Trabajamos únicamente con marcas auditadas y productos avalados por organismos internacionales. Garantizamos 100 % ausencia de trazas de gluten para tu tranquilidad.'
    }
];

export const HeroDelivery = (): ReactElement => {
    return (
        <section className="w-full">
            {/* ───── Héroe con imagen de fondo ───── */}
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-lg">
                {/* Imagen optimizada con responsive images */}
                <picture>
                    <source 
                        media="(max-width: 480px)" 
                        srcSet="/optimized/varios-productos-de-despensa-y-pastas-small.webp" 
                    />
                    <source 
                        media="(max-width: 768px)" 
                        srcSet="/optimized/varios-productos-de-despensa-y-pastas-medium.webp" 
                    />
                    <source 
                        media="(max-width: 1024px)" 
                        srcSet="/optimized/varios-productos-de-despensa-y-pastas-large.webp" 
                    />
                    <source 
                        media="(max-width: 1920px)" 
                        srcSet="/optimized/varios-productos-de-despensa-y-pastas-xlarge.webp" 
                    />
                    <OptimizedImage
                        src="/optimized/varios-productos-de-despensa-y-pastas.webp"
                        alt="Variedad de productos sin gluten"
                        className="h-[26rem] w-full sm:h-[28rem]"
                        loading="lazy"
                        sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, (max-width: 1920px) 1920px, 100vw"
                    />
                </picture>
                
                {/* veladura */}
                <div className="absolute inset-0 bg-black/60" />

                {/* título */}
                <h1
                    className="
                    absolute left-6 top-6 z-10 mb-12
                    max-w-xs whitespace-pre-line font-cap-hero leading-tight text-white
                    text-2xl sm:max-w-md sm:text-3xl lg:text-4xl
                    "
                >
                    Con un click tienes tu producto
                    en la puerta de tu casa!
                </h1>

                {/* tarjetas superpuestas SOLO ≥ md */}
                <div className="absolute bottom-6 left-6 right-6 z-10 hidden gap-6 md:flex">
                    {CARDS.map(({ eyebrow, title, text }) => (
                    <article
                        key={title}
                        className="flex-1 rounded-lg bg-black/70 p-6 md:p-8"
                    >
                        <p className="font-cap-medium text-xs uppercase tracking-wide text-white/90">
                        {eyebrow}
                        </p>
                        <h3 className="mb-3 font-cap-hero text-xl text-white md:text-2xl">
                        {title}
                        </h3>
                        <p className="font-cap-text text-sm leading-relaxed text-white/80">
                        {text}
                        </p>
                    </article>
                    ))}
                </div>
            </div>

            {/* tarjetas EN MÓVIL (< md) */}
            <div className="mt-6 flex flex-col gap-6 px-6 md:hidden">
            {CARDS.map(({ eyebrow, title, text }) => (
                <article
                key={title}
                className="rounded-lg bg-black/80 p-6 backdrop-blur-sm"
                >
                <p className="font-cap-medium text-xs uppercase tracking-wide text-white/90">
                    {eyebrow}
                </p>
                <h3 className="mb-3 font-cap-hero text-lg text-white">
                    {title}
                </h3>
                <p className="font-cap-text text-sm leading-relaxed text-white/80">
                    {text}
                </p>
                </article>
            ))}
            </div>
        </section>
    );
};

export default HeroDelivery;

import type { ReactElement } from "react";
import {
    RiTruckLine,
    RiMedal2Line,
    RiStore2Line,
    RiCustomerService2Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

interface Benefit {
    icon: React.ElementType;
    title: string;
    description: string;
}

const BENEFITS: Benefit[] = [
    {
        icon: RiTruckLine,
        title: 'Envíos a todo el país',
        description:
        'Recibe tus productos sin gluten donde estés, con entregas rápidas y seguras.',
    },
    {
        icon: RiMedal2Line,
        title: 'Productos certificados',
        description:
        'Cada artículo cuenta con sellos que garantizan la ausencia total de gluten.',
    },
    {
        icon: RiStore2Line,
        title: 'Proveedores confiables',
        description:
        'Trabajamos exclusivamente con marcas auditadas y especialistas en alimentos libres de gluten.',
    },
    {
        icon: RiCustomerService2Line,
        title: 'Asesoría personalizada',
        description:
        'Nuestro equipo responde tus dudas sobre intolerancias y preparaciones sin gluten.',
    },
];

export const AboutUs = (): ReactElement => (
    <section id="sobre-nosotros" className="w-full overflow-x-hidden bg-background py-24 sm:py-28 lg:py-32">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 sm:px-6 lg:grid-cols-[1.35fr_2fr] lg:gap-24">
        {/* ─────────── Lado izquierdo ─────────── */}
        <div className="flex flex-col">
            <h2 className="mb-6 font-cap-hero text-4xl leading-tight text-black sm:text-5xl lg:text-6xl lg:whitespace-nowrap">
            ¿Quiénes somos?
            </h2>

            <p className="mb-8 max-w-lg font-cap-text text-base leading-relaxed text-black">
            Somos la primera tienda boliviana especializada en productos{' '}
            <strong>100 % libres de gluten</strong>. Nuestra misión es darte la
            tranquilidad de alimentarte sin riesgos, con la mejor variedad y el
            respaldo de proveedores certificados.
            </p>

            <div className="mt-8 flex justify-start">
                <Link
                    to="/about"
                    className="w-fit rounded-lg bg-secondary px-8 py-3 text-base font-cap-link text-secondary-foreground transition hover:brightness-110"
                >
                    Conoce más sobre nosotros
                </Link>
            </div>
        </div>

        {/* ─────────── Beneficios ─────────── */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex flex-col gap-4">
                <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-highlight/40 text-header sm:h-24 sm:w-24">
                    <Icon size={48} />
                </div>
                <h3 className="font-cap-medium text-xl text-black">{title}</h3>
                </div>

                <p className="font-cap-text text-sm leading-relaxed text-black sm:text-base">
                {description}
                </p>
            </div>
            ))}
        </div>
        </div>
    </section>
);

export default AboutUs;

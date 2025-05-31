import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqItem = {
    question: string;
    answer: string;
};

const FAQ_DATA: FaqItem[] = [
    {
        question: '¿Los productos son realmente 100 % libres de gluten?',
        answer:
        'Sí. Todos los artículos de nuestra tienda cuentan con certificaciones oficiales libres de gluten. Trabajamos únicamente con proveedores auditados y verificamos cada lote recibido.',
    },
    {
        question: '¿Realizan envíos a todo el país?',
        answer:
        'Hacemos entregas a los nueve departamentos. El tiempo de llegada promedio es de 24 – 72 h en capitales y hasta 5 días en zonas rurales.',
    },
    {
        question: '¿Qué métodos de pago aceptan?',
        answer:
        'Puedes pagar con tarjeta de débito/crédito, transferencias bancarias, billeteras móviles y contra entrega (solo en algunas ciudades).',
    },
    {
        question: '¿Puedo devolver un producto si llega dañado?',
        answer:
        'Por supuesto. Tienes 7 días desde la recepción para solicitar cambio o reembolso. Solo envíanos fotos del daño y gestionaremos la recogida sin costo.',
    },
    {
        question: '¿Cómo obtengo mi factura o recibo?',
        answer:
        'Después de completar la compra recibirás un correo con tu factura electrónica. También podrás descargarla desde tu panel de usuario en cualquier momento.',
    },
];

export const FAQSection = () => (
    <section className="mx-auto my-16 w-full max-w-screen-xl px-4 md:my-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
        {/* Título */}
        <header className="flex flex-col">
            <span className="mb-4 w-fit rounded-md bg-gray-200 px-3 py-1 text-xs font-cap-medium uppercase tracking-wide text-gray-700">
            FAQ
            </span>

            <h2 className="whitespace-pre-line font-cap-hero text-3xl leading-tight md:text-4xl lg:text-5xl">
            Preguntas y
            <br /> respuestas sobre
            <br /> nuestra plataforma
            </h2>
        </header>

        {/* Lista de preguntas */}
        <div className="space-y-3">
            {FAQ_DATA.map(({ question, answer }) => (
            <Disclosure key={question} question={question} answer={answer} />
            ))}
        </div>
        </div>
    </section>
    );

    /* ---------- Helpers ---------- */

    interface DisclosureProps {
    question: string;
    answer: string;
    }

    const Disclosure = ({ question, answer }: DisclosureProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-md border border-gray-200">
        <button
            className="flex w-full items-center justify-between px-6 py-4 text-left font-cap-medium text-sm sm:text-base"
            onClick={() => setOpen(!open)}
        >
            {question}
            <ChevronDown
            className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
            }`}
            />
        </button>

        {open && (
            <div className="px-6 pb-6 text-sm leading-relaxed text-gray-600">
            {answer}
            </div>
        )}
        </div>
    );
};

export default FAQSection;

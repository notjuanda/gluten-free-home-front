import { CheckCircle2, XCircle, MailCheck } from 'lucide-react';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';

type Status = 'success' | 'error' | 'idle';

interface Props {
    status: Status;
    message?: string;
}

export default function VerificationFeedback({ status, message }: Props) {
    const config: Record<
        Status,
        { icon: JSX.Element; title: string; cta: string; ctaTo: string }
    > = {
        success: {
        icon: <CheckCircle2 size={64} className="text-highlight" />,
        title: '¡Correo verificado!',
        cta: 'Iniciar sesión',
        ctaTo: '/login',
        },
        error: {
        icon: <XCircle size={64} className="text-destructive" />,
        title: 'Ups, algo salió mal',
        cta: 'Intentar de nuevo',
        ctaTo: '/',
        },
        idle: {
        icon: <MailCheck size={64} className="text-highlight" />,
        title: 'Revisa tu bandeja',
        cta: 'Volver al inicio',
        ctaTo: '/',
        },
    };

    const { icon, title, cta, ctaTo } = config[status];

    return (
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 rounded-xl bg-card p-8 text-center shadow-lg">
        {icon}

        <h2 className="text-2xl font-cap-heading-2">{title}</h2>

        <p className="text-sm text-muted-foreground">
            {message ??
            (status === 'error'
                ? 'Token inválido o expirado.'
                : 'Te enviamos un correo con un enlace de verificación.')}
        </p>

        <Link
            to={ctaTo}
            className="rounded-full bg-button px-6 py-2 font-cap-medium text-white transition-opacity hover:bg-button/90"
        >
            {cta}
        </Link>
        </div>
    );
}

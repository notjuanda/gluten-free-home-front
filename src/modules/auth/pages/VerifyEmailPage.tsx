import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useVerifyEmail } from '../hooks/useVerifyEmail';
import VerificationFeedback from '../components/VerificationFeedback';

export default function VerifyEmailPage() {
    const [params] = useSearchParams();
    const token = params.get('token') ?? '';

    const {
        mutate: verify,
        status,
        isSuccess,
        isError,
        data,
        error,
    } = useVerifyEmail();

    useEffect(() => {
        if (token) verify(token);
    }, [token, verify]);

    if (!token) {
        return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <VerificationFeedback
            status="idle"
            message="Te enviamos un correo de verificación. Revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta."
            />
        </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
        {status === 'pending' ? (
            <div className="flex flex-col items-center gap-4">
            <Loader2 size={48} className="animate-spin text-secondary" />
            <p className="text-foreground">Verificando tu correo…</p>
            </div>
        ) : (
            <VerificationFeedback
            status={isSuccess ? 'success' : isError ? 'error' : 'idle'}
            message={
                isSuccess
                ? data?.message
                : error?.message || 'Token inválido o expirado.'
            }
            />
        )}
        </div>
    );
}

import { useMutation } from '@tanstack/react-query';
import { createStripeCheckoutSession } from '@/modules/core/api/payments.api';
import type { CreateCheckoutSessionInput } from '@/modules/core/types/payment.type';

export const useStripeCheckout = () => {
    return useMutation({
        mutationFn: async (payload: CreateCheckoutSessionInput) => {
            const response = await createStripeCheckoutSession(payload);
            return response;
        },
        onSuccess: (data) => {
            // Redirigir a la URL de Stripe
            if (data.url) {
                window.location.href = data.url;
            }
        },
        onError: (error) => {
            console.error('Error al crear sesión de checkout:', error);
        },
    });
}; 
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePayment } from '../../../core/api/payments.api';
import type { UpdatePaymentInput } from '../../../core/types/payment.type';

interface UseUpdatePaymentProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useUpdatePayment({ onSuccess, onError }: UseUpdatePaymentProps = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdatePaymentInput }) =>
            updatePayment(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['payments'] });
            onSuccess?.();
        },
        onError: (error: Error) => {
            onError?.(error);
        },
    });
} 
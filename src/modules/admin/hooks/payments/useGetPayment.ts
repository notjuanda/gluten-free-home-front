import { useQuery } from '@tanstack/react-query';
import { getPayment } from '../../../core/api/payments.api';
import type { Payment } from '../../../core/types/payment.type';

interface UseGetPaymentProps {
    id: number;
    enabled?: boolean;
}

export function useGetPayment({ id, enabled = true }: UseGetPaymentProps) {
    return useQuery<Payment>({
        queryKey: ['payment', id],
        queryFn: () => getPayment(id),
        enabled: enabled && !!id,
        staleTime: 2 * 60 * 1000, // 2 minutos
        gcTime: 5 * 60 * 1000, // 5 minutos
    });
} 
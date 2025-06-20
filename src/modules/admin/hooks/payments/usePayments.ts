import { useQuery } from '@tanstack/react-query';
import { getPayments } from '../../../core/api/payments.api';
import type { Payment } from '../../../core/types/payment.type';

interface UsePaymentsParams {
    refreshTrigger?: number;
}

export function usePayments({ refreshTrigger }: UsePaymentsParams = {}) {
    return useQuery<Payment[]>({
        queryKey: ['payments', refreshTrigger],
        queryFn: getPayments,
        staleTime: 2 * 60 * 1000, // 2 minutos
        gcTime: 5 * 60 * 1000, // 5 minutos
    });
} 
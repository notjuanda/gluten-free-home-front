import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../../../core/api/orders.api';
import type { Order } from '../../../core/types/order.type';

interface UseGetOrderProps {
    id: number;
    enabled?: boolean;
}

export function useGetOrder({ id, enabled = true }: UseGetOrderProps) {
    return useQuery<Order>({
        queryKey: ['order', id],
        queryFn: () => getOrder(id),
        enabled: enabled && !!id,
        staleTime: 2 * 60 * 1000, // 2 minutos
        gcTime: 5 * 60 * 1000, // 5 minutos
    });
} 
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../../core/api/orders.api';
import type { Order } from '../../../core/types/order.type';

interface UseOrdersParams {
    refreshTrigger?: number;
}

export function useOrders({ refreshTrigger }: UseOrdersParams = {}) {
    return useQuery<Order[]>({
        queryKey: ['orders', refreshTrigger],
        queryFn: getOrders,
        staleTime: 2 * 60 * 1000, // 2 minutos
        gcTime: 5 * 60 * 1000, // 5 minutos
    });
} 
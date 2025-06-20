import { useQuery } from '@tanstack/react-query';
import { getOrderItems } from '../../../core/api/orders.api';
import type { OrderItem } from '../../../core/types/order-item.type';

interface UseGetOrderItemsProps {
    orderId: number;
    enabled?: boolean;
}

export function useGetOrderItems({ orderId, enabled = true }: UseGetOrderItemsProps) {
    return useQuery<OrderItem[]>({
        queryKey: ['order-items', orderId],
        queryFn: () => getOrderItems(orderId),
        enabled: enabled && !!orderId,
        staleTime: 2 * 60 * 1000, // 2 minutos
        gcTime: 5 * 60 * 1000, // 5 minutos
    });
} 
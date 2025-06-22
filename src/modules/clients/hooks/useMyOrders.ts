import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '@/modules/core/api/orders.api';

export const useMyOrders = () => {
    return useQuery({
        queryKey: ['my-orders'],
        queryFn: getMyOrders,
        staleTime: 1000 * 60 * 5,
    });
}; 
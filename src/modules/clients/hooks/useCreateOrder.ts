import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '@/modules/core/api/orders.api';
import type { CreateOrderInput } from '@/modules/core/types/order.type';

export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateOrderInput) => {
            const response = await createOrder(payload);
            return response;
        },
        onSuccess: () => {
            // Invalidar queries relacionadas con órdenes
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error) => {
            console.error('Error al crear orden:', error);
        },
    });
}; 
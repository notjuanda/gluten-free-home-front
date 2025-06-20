import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrder } from '../../../core/api/orders.api';
import type { UpdateOrderInput } from '../../../core/types/order.type';

interface UseUpdateOrderProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useUpdateOrder({ onSuccess, onError }: UseUpdateOrderProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateOrderInput }) =>
            updateOrder(id, payload),
        onSuccess: (data, variables) => {
            // Invalidate and refetch orders
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
            onSuccess?.();
        },
        onError: (error: Error) => {
            onError?.(error);
        },
    });
} 
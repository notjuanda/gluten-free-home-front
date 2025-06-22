import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '../../../core/api/orders.api';

interface UseUpdateOrderStatusProps {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useUpdateOrderStatus({ onSuccess, onError }: UseUpdateOrderStatusProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, estado }: { id: number; estado: string }) =>
            updateOrderStatus(id, estado),
        onSuccess: (data, variables) => {
            // Invalidate and refetch orders
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['my-orders'] });
            onSuccess?.();
        },
        onError: (error: Error) => {
            console.error('Error al actualizar estado de orden:', error);
            // Mostrar mensaje más amigable
            const friendlyError = new Error(
                'No se pudo actualizar el estado del pedido. Verifica que el backend soporte esta operación.'
            );
            onError?.(friendlyError);
        },
    });
} 
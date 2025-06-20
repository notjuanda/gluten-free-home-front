import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductImage } from '../../../core/api/products.api';

interface UseDeleteProductImageProps {
    productId: number;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useDeleteProductImage({ 
    productId, 
    onSuccess, 
    onError 
}: UseDeleteProductImageProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (imageId: number) => deleteProductImage(productId, imageId),
        onSuccess: () => {
            // Invalidate and refetch product images
            queryClient.invalidateQueries({ queryKey: ['product-images', productId] });
            onSuccess?.();
        },
        onError: (error: Error) => {
            onError?.(error);
        },
    });
} 
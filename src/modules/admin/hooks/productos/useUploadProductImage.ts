import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadProductImage } from '../../../core/api/products.api';

interface UseUploadProductImageProps {
    productId: number;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

export function useUploadProductImage({ 
    productId, 
    onSuccess, 
    onError 
}: UseUploadProductImageProps) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ file, textoAlt }: { file: File; textoAlt?: string }) =>
            uploadProductImage(productId, { file, textoAlt }),
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
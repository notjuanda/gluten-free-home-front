import { useQuery } from '@tanstack/react-query';
import { getProductImages } from '../../../core/api/products.api';
import type { ProductImage } from '../../../core/types/product-image.type';

interface UseGetProductImagesProps {
    productId: number;
    enabled?: boolean;
}

export function useGetProductImages({ productId, enabled = true }: UseGetProductImagesProps) {
    return useQuery<ProductImage[]>({
        queryKey: ['product-images', productId],
        queryFn: () => getProductImages(productId),
        enabled: enabled && !!productId,
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    });
} 
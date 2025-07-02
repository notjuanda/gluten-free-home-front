import { useState, useEffect } from 'react';
import { getProductImages } from '@/modules/core/api/products.api';
import type { ProductImage } from '@/modules/core/types/product-image.type';
import { getImageUrl } from '@/modules/core/utils/get-image-url';

export const useProductImages = (productId: number) => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!productId) {
        setIsLoading(false);
        return;
    };

    getProductImages(productId)
      .then(data => {
        const processedImages = data.map(image => ({
            ...image,
            urlImagen: getImageUrl(image.urlImagen)
        }));
        setImages(processedImages);
      })
      .catch(err => {
        console.error("Error fetching product images:", err);
        setImages([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return { images, isLoading };
}; 
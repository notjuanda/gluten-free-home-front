import { useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { useGetProductImages } from '../../hooks/productos/useGetProductImages';
import ProductImagesCarousel from './ProductImagesCarousel';
import type { ViewImagesButtonProps } from '../../types/products-components.type';

export default function ViewImagesButton({ 
    productId, 
    productName, 
    className = "" 
}: ViewImagesButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const { 
        data: images, 
        isLoading 
    } = useGetProductImages({ 
        productId, 
        enabled: isOpen 
    });

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                className={`p-2 rounded-full bg-background border border-border shadow hover:bg-primary/10 text-primary hover:text-primary-dark transition ${className}`}
                title={`Ver imágenes de ${productName}`}
                onClick={handleOpen}
                disabled={isLoading}
            >
                {isLoading ? (
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                    <FiImage className="w-4 h-4" />
                )}
            </button>

            {isOpen && (
                <ProductImagesCarousel
                    images={images || []}
                    isOpen={isOpen}
                    onClose={handleClose}
                    productId={productId}
                />
            )}
        </>
    );
} 
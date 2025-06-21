import { useState } from "react";
import { useProductImages } from "../hooks/useProductImages";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { TopProductCardProps } from "../types/products-components.type";

const ProductCard: React.FC<TopProductCardProps> = ({ product }) => {
    const { images, isLoading } = useProductImages(product.id);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const goToIndex = (e: React.MouseEvent, index: number) => {
        e.stopPropagation();
        setCurrentIndex(index);
    }

    const hasImages = images && images.length > 0;
    const mainImageSrc = hasImages ? images[currentIndex]?.urlImagen : '/logo-gluten-free-home.png';

    return (
        <div className="bg-client text-client-foreground p-4 flex flex-col items-center min-h-[300px] rounded-2xl transition-all duration-200 hover:scale-[1.03] hover:shadow-lg">
        <div className="relative flex justify-center items-center mb-2 w-full">
            {isLoading ? (
                <div className="w-32 h-32 bg-primary animate-pulse"></div>
            ) : (
                <>
                    <div className="bg-primary flex items-center justify-center h-32 w-32 mx-auto">
                        <img
                            src={mainImageSrc}
                            alt={hasImages ? images[currentIndex]?.textoAlt || product.nombre : product.nombre}
                            className="max-h-full max-w-full object-contain bg-primary"
                        />
                        {hasImages && images.length > 1 && (
                            <>
                                <button 
                                    onClick={handlePrevious} 
                                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 text-primary opacity-80 hover:opacity-100 transition-opacity"
                                >
                                    <FiChevronLeft size={20} />
                                </button>
                                <button 
                                    onClick={handleNext} 
                                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 text-primary opacity-80 hover:opacity-100 transition-opacity"
                                >
                                    <FiChevronRight size={20} />
                                </button>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => goToIndex(e, index)}
                                            className={`h-2 w-2 rounded-full border border-border transition-colors ${
                                                currentIndex === index ? 'bg-primary' : 'bg-muted hover:bg-primary/60'
                                            }`}
                                        ></button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
        <div className="text-xs text-left w-full mb-2">
            <p className="font-bold truncate">{product.nombre}</p>
            <span className="font-bold text-lg">Bs {product.precioBob}</span>
        </div>
        <button className="bg-black text-white text-xs px-3 py-1 mt-auto cursor-pointer font-mono tracking-tight rounded transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
            Agregar al carrito
        </button>
        </div>
    );
};

export default ProductCard; 
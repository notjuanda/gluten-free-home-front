import { useState } from "react";
import { useProductImages } from "../hooks/useProductImages";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { TopProductCardProps } from "../types/products-components.type";
import { useNavigate } from 'react-router-dom';

const ProductCard: React.FC<TopProductCardProps> = ({ product, onAddToCart}) => {
    const { images, isLoading } = useProductImages(product.id);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/producto/${product.slug}`);
    };

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
    const mainImageSrc = hasImages ? images[currentIndex]?.urlImagen : '/optimized/logo-gluten-free-home.webp';

    return (
        <div className="bg-client text-client-foreground p-3 sm:p-4 flex flex-col items-center min-h-[320px] max-h-[340px] rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-[1.02] sm:hover:scale-[1.03] hover:shadow-lg cursor-pointer" onClick={handleCardClick}>
        <div className="relative flex justify-center items-center mb-2 w-full">
            {isLoading ? (
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-primary animate-pulse rounded-lg"></div>
            ) : (
                <>
                    <div className="bg-primary flex items-center justify-center h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 mx-auto rounded-lg overflow-hidden">
                        <img
                            src={mainImageSrc}
                            alt={hasImages ? images[currentIndex]?.textoAlt || product.nombre : product.nombre}
                            className="max-h-full max-w-full object-contain bg-primary"
                        />
                        {hasImages && images.length > 1 && (
                            <>
                                <button 
                                    onClick={handlePrevious} 
                                    className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-1.5 bg-background/80 text-primary opacity-80 hover:opacity-100 transition-opacity rounded"
                                >
                                    <FiChevronLeft size={16} className="sm:w-5 sm:h-5" />
                                </button>
                                <button 
                                    onClick={handleNext} 
                                    className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 p-1 sm:p-1.5 bg-background/80 text-primary opacity-80 hover:opacity-100 transition-opacity rounded"
                                >
                                    <FiChevronRight size={16} className="sm:w-5 sm:h-5" />
                                </button>
                                <div className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => goToIndex(e, index)}
                                            className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full border border-border transition-colors ${
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
        <div className="w-full flex-grow flex flex-col text-left mb-2 min-h-[60px]">
            <p className="font-bold text-[10px] sm:text-xs lg:text-sm leading-tight min-h-[2.5em] line-clamp-2 overflow-hidden">
                {product.nombre}
            </p>
            <div className="mt-auto">
                <span className="font-bold text-base sm:text-lg lg:text-xl">Bs {product.precioBob}</span>
            </div>
        </div>
        <button 
            className="bg-black text-white text-xs sm:text-sm px-0.5 sm:px-0.5 py-0.5 sm:py-0.5 mt-auto cursor-pointer font-mono tracking-tight rounded transition-all duration-200 hover:bg-primary hover:text-primary-foreground w-full"
            onClick={e => { e.stopPropagation(); onAddToCart(product); }}
        >
            Agregar
        </button>
        </div>
    );
};

export default ProductCard; 
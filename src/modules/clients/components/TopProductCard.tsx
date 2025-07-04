import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import type { TopProductCardProps } from "../types/products-components.type";

const TopProductCard: React.FC<TopProductCardProps> = ({ product, onAddToCart }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = product.imagenes || [];
    const hasImages = images.length > 0;

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const mainImageSrc = hasImages ? images[currentIndex]?.urlImagen : '/optimized/logo-gluten-free-home.webp';

    return (
        <div className="w-full sm:w-32 md:w-36 lg:w-40 xl:w-44 sm:flex-shrink-0 group p-2 flex flex-col items-center min-h-[220px] max-h-[260px]">
            <div className='relative bg-primary flex items-center justify-center h-24 sm:h-28 md:h-32 w-full mb-2 rounded-lg overflow-hidden'>
                <img
                    src={mainImageSrc}
                    alt={hasImages ? images[currentIndex]?.textoAlt || product.nombre : product.nombre}
                    className="max-h-full max-w-full object-contain bg-primary"
                />
                {hasImages && images.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrevious} 
                            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground rounded"
                        >
                            <FiChevronLeft size={14} className="sm:w-4 sm:h-4" />
                        </button>
                        <button 
                            onClick={handleNext} 
                            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground rounded"
                        >
                            <FiChevronRight size={14} className="sm:w-4 sm:h-4" />
                        </button>
                    </>
                )}
            </div>
            <div className="text-xs text-center mt-1 w-full text-client-foreground">
                <p className='line-clamp-2 font-bold text-xs sm:text-sm overflow-hidden'>{product.nombre}</p>
                <span className="font-bold text-sm sm:text-base">Bs {product.precioBob}</span>
            </div>
            <button 
                className="bg-black text-white text-xs px-3 py-1.5 mt-2 cursor-pointer font-mono tracking-tight rounded transition-all duration-200 hover:bg-primary hover:text-primary-foreground w-full flex items-center justify-center gap-1"
                onClick={() => onAddToCart(product)}
            >
                <FiShoppingCart className="w-4 h-4 sm:hidden" />
                <span className="hidden sm:inline">Agregar</span>
            </button>
        </div>
    );
};

export default TopProductCard; 
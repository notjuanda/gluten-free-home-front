import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { TopProductCardProps } from "../types/products-components.type";

const TopProductCard: React.FC<TopProductCardProps> = ({ product }) => {
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

    const mainImageSrc = hasImages ? images[currentIndex]?.urlImagen : '/logo-gluten-free-home.png';

    return (
        <div className="w-44 flex-shrink-0 group p-3 flex flex-col items-center">
            <div className='relative bg-primary flex items-center justify-center h-32 w-full mb-2'>
                <img
                    src={mainImageSrc}
                    alt={hasImages ? images[currentIndex]?.textoAlt || product.nombre : product.nombre}
                    className="max-h-full max-w-full object-contain bg-primary"
                />
                {hasImages && images.length > 1 && (
                    <>
                        <button 
                            onClick={handlePrevious} 
                            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground"
                        >
                            <FiChevronLeft size={16} />
                        </button>
                        <button 
                            onClick={handleNext} 
                            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 p-1 bg-background/80 text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground"
                        >
                            <FiChevronRight size={16} />
                        </button>
                    </>
                )}
            </div>
            <div className="text-xs text-center mt-2 w-full text-client-foreground">
                <p className='truncate font-bold'>{product.nombre}</p>
                <span className="font-bold text-base">Bs {product.precioBob}</span>
            </div>
            <button className="bg-black text-white text-xs px-3 py-1 mt-2 cursor-pointer font-mono tracking-tight rounded transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
                Agregar al carrito
            </button>
        </div>
    );
};

export default TopProductCard; 
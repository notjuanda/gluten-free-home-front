import { useState } from "react";
import type { Product } from "@/modules/core/types/product.type";
import { useProductImages } from "../hooks/useProductImages";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
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
        <div className="bg-client text-client-foreground p-4 flex flex-col items-center min-h-[300px] border border-border">
        <div className="w-full flex justify-center items-center mb-2">
            {isLoading ? (
                <div className="w-32 h-32 bg-white animate-pulse"></div>
            ) : (
                <img
                    src={mainImageSrc}
                    alt={hasImages ? images[currentIndex]?.textoAlt || product.nombre : product.nombre}
                    className="w-32 h-32 object-contain bg-white"
                />
            )}
        </div>
        <div className="text-xs text-left w-full mb-2">
            <p className="font-bold truncate">{product.nombre}</p>
            <span className="font-bold text-lg">Bs {product.precioBob}</span>
        </div>
        <button className="bg-black text-white text-xs px-3 py-1 mt-auto cursor-pointer font-mono tracking-tight">
            Agregar al carrito
        </button>
        </div>
    );
};

export default ProductCard; 
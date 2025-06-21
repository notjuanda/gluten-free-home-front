import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiChevronLeft, FiChevronRight, FiX, FiImage } from 'react-icons/fi';
import DeleteImageButton from './DeleteImageButton';
import type { ProductImagesCarouselProps } from '../../types/products-components.type';

export default function ProductImagesCarousel({ 
    images, 
    isOpen, 
    onClose, 
    initialIndex = 0,
    productId
}: ProductImagesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    // Resetear el índice si cambia el array de imágenes
    useEffect(() => {
        if (images.length === 0) {
            setCurrentIndex(0);
        } else if (currentIndex >= images.length) {
            setCurrentIndex(images.length - 1);
        }
    }, [images, currentIndex]);

    if (!isOpen) return null;

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        } else if (e.key === 'ArrowLeft') {
            handlePrevious();
        } else if (e.key === 'ArrowRight') {
            handleNext();
        }
    };

    // Función para obtener la URL completa de la imagen
    const getImageUrl = (imageUrl: string) => {
        if (imageUrl.startsWith('http')) {
            return imageUrl; // Si ya es una URL completa
        }
        return `${API_BASE_URL}${imageUrl}`; // Concatenar con la URL del backend
    };

    const isValidIndex = images.length > 0 && currentIndex >= 0 && currentIndex < images.length;

    const modalContent = (
        <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div 
                className="relative w-full max-w-6xl max-h-full flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6 text-white">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xl font-semibold">Imágenes del Producto</h3>
                        {images.length > 0 && (
                            <span className="text-sm text-gray-300">
                                {currentIndex + 1} de {images.length}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        title="Cerrar"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                {images.length === 0 ? (
                    // Mensaje cuando no hay imágenes
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center text-white">
                            <FiImage className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                            <h4 className="text-lg font-semibold mb-2">No hay imágenes</h4>
                            <p className="text-gray-300 mb-4">
                                Este producto aún no tiene imágenes asignadas.
                            </p>
                            <p className="text-sm text-gray-400">
                                Usa el botón de subir imagen para agregar fotos al producto.
                            </p>
                        </div>
                    </div>
                ) : (
                    // Carrusel normal cuando hay imágenes
                    <>
                        {/* Main Image Container */}
                        <div className="flex-1 flex items-center justify-center overflow-y-auto">
                            <div className="relative w-full max-w-full">
                                {images.length > 1 && (
                                    <button
                                        onClick={handlePrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
                                        title="Anterior"
                                    >
                                        <FiChevronLeft className="w-6 h-6" />
                                    </button>
                                )}
                                <div className="flex justify-center relative">
                                    {isValidIndex ? (
                                        <img
                                            src={getImageUrl(images[currentIndex].urlImagen)}
                                            alt={images[currentIndex].textoAlt || `Imagen ${currentIndex + 1} del producto`}
                                            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                                        />
                                    ) : (
                                        <div className="text-white">Imagen no disponible</div>
                                    )}
                                    {/* Botón de eliminar en la imagen principal */}
                                    {isValidIndex && (
                                        <div className="absolute top-4 right-4">
                                            <DeleteImageButton 
                                                image={images[currentIndex]} 
                                                productId={productId}
                                            />
                                        </div>
                                    )}
                                </div>
                                {images.length > 1 && (
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
                                        title="Siguiente"
                                    >
                                        <FiChevronRight className="w-6 h-6" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-2 overflow-x-auto pb-2 max-w-full">
                                    {images.map((image, index) => (
                                        <div key={image.id} className="relative group">
                                            <button
                                                onClick={() => setCurrentIndex(index)}
                                                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                                    index === currentIndex 
                                                        ? 'border-primary shadow-lg' 
                                                        : 'border-gray-600 hover:border-gray-400'
                                                }`}
                                            >
                                                <img
                                                    src={getImageUrl(image.urlImagen)}
                                                    alt={image.textoAlt || `Miniatura ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                            
                                            {/* Botón de eliminar en miniatura */}
                                            <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <DeleteImageButton 
                                                    image={image} 
                                                    productId={productId}
                                                    className="w-6 h-6 p-1"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Image Info */}
                        {isValidIndex && images[currentIndex].textoAlt && (
                            <div className="mt-4 text-center text-white">
                                <p className="text-sm text-gray-300">{images[currentIndex].textoAlt}</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );

    // Usar createPortal para renderizar el modal fuera del DOM de la card
    return createPortal(modalContent, document.body);
} 
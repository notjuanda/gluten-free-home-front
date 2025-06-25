import React, { useState } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'lazy' | 'eager';
    sizes?: string;
    placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
    src,
    alt,
    className = '',
    loading = 'lazy',
    sizes = '100vw',
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg=='
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Generate WebP version if possible
    const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Placeholder */}
            <div 
                className={`absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                    backgroundImage: `url(${placeholder})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            
            {/* Error fallback */}
            {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                        <svg className="mx-auto h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">Error al cargar imagen</p>
                    </div>
                </div>
            )}
            
            {/* Optimized image */}
            <picture>
                <source srcSet={webpSrc} type="image/webp" />
                <img
                    src={src}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={loading}
                    sizes={sizes}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                />
            </picture>
        </div>
    );
};

export default OptimizedImage; 
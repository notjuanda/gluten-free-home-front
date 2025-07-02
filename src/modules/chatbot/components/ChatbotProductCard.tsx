import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/modules/clients/context/CartContext';
import type { Product } from '@/modules/core/types/product.type';

interface ChatbotProductCardProps {
    product: {
        id: number;
        name: string;
        price?: number;
        description?: string;
        category?: string;
    };
}

export const ChatbotProductCard = ({ product }: ChatbotProductCardProps) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        // Convertir el producto del chatbot al formato esperado por el carrito
        const cartProduct: Product = {
        id: product.id,
        nombre: product.name,
        slug: product.name.toLowerCase().replace(/\s+/g, '-'),
        descripcion: product.description,
        precioBob: product.price || 0,
        precioUsd: undefined,
        stock: 1,
        activo: true,
        certificadoSinGluten: true,
        urlCertificado: undefined,
        categoria: {
            id: 1,
            nombre: product.category || 'Sin categoría',
            slug: (product.category || 'sin-categoria').toLowerCase().replace(/\s+/g, '-'),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        marca: undefined,
        imagenes: [],
        ingredientes: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        };

        addToCart(cartProduct, 1);
    };

    return (
        <div className="bg-white border border-green-200 rounded-md p-3 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm text-gray-900 truncate mb-1">
                {product.name}
            </h4>
            {product.description && (
                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {product.description}
                </p>
            )}
            <div className="flex items-center justify-between">
                <span className="font-bold text-green-600 text-sm">
                ${product.price?.toFixed(2) || 'N/A'}
                </span>
                {product.category && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                </span>
                )}
            </div>
            </div>
            <button
            onClick={handleAddToCart}
            className="flex-shrink-0 bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors duration-200"
            title="Agregar al carrito"
            >
            <ShoppingCart size={14} />
            </button>
        </div>
        </div>
    );
}; 
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import type { Product } from '@/modules/core/types/product.type';

interface RecommendedProductsProps {
    onAddToCart: (product: Product) => void;
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ onAddToCart }) => {
    const { topProducts } = useProducts();

    if (!topProducts || topProducts.length === 0) {
        return null;
    }

    return (
        <div className="mt-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    Productos Recomendados
                </h2>
                <p className="text-muted-foreground">
                    Descubre nuestros productos más populares
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {topProducts.slice(0, 4).map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecommendedProducts; 
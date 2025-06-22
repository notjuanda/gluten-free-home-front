import ProductCard from './ProductCard';
import type { RecommendedProductsSectionProps, RecommendedProductsProps } from '../types/products-components.type';

export const RecommendedProductsSection: React.FC<RecommendedProductsSectionProps> = ({ products, onAddToCart, title = 'Productos Recomendados', subtitle = 'Descubre nuestros productos más populares' }) => {
    if (!products || products.length === 0) {
        return null;
    }
    return (
        <div className="mt-8 sm:mt-10 lg:mt-12">
            <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                        {subtitle}
                    </p>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.slice(0, 4).map(product => (
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

import { useProducts } from '../hooks/useProducts';

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ onAddToCart }) => {
    const { topProducts } = useProducts();
    return <RecommendedProductsSection products={topProducts} onAddToCart={onAddToCart} />;
};

export default RecommendedProducts; 
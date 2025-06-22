import ProductCard from './ProductCard';
import type { Product } from '@/modules/core/types/product.type';
import type { ProductsListProps } from '../types/products-components.type';

const ProductsList: React.FC<ProductsListProps> = ({ products, onAddToCart }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
};

export default ProductsList; 
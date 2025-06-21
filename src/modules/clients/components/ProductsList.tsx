import ProductCard from './ProductCard';
import type { Product } from '@/modules/core/types/product.type';

interface Props {
  products: Product[];
}

const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductsList; 
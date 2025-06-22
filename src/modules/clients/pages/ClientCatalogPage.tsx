import ProductsFilterSidebar from '../components/ProductsFilterSidebar';
import ProductsList from '../components/ProductsList';
import { useProducts } from '../hooks/useProducts';
import TopProductCard from '../components/TopProductCard';

import { useCart } from '@/modules/clients/context/CartContext';
import { useAuth } from '@/modules/core/hooks/useAuth';
import LoginRequiredModal from '@/modules/clients/components/LoginRequiredModal';
import { useState } from 'react';
import type { Product } from '@/modules/core/types/product.type';


const ClientCatalogPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');

  const handleAddToCart = (product: Product) => {
    console.log('handleAddToCart llamado con producto:', product);
    console.log('Estado de autenticación:', isAuthenticated);
    console.log('Usuario actual:', user);
    
    if (!isAuthenticated) {
      console.log('Usuario no autenticado, mostrando modal');
      setShowLoginModal(true);
      return;
    }
    console.log('Usuario autenticado, agregando al carrito');
    addToCart(product);
    
    // Mostrar notificación de éxito
    setAddedProductName(product.nombre);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const {
    topProducts,
    filters,
    setFilters,
    filteredProducts,
    categories,
    brands,
    ingredients
  } = useProducts();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-client text-client-foreground p-8 flex-shrink-0 border-border rounded-2xl">
        <ProductsFilterSidebar
          filters={filters}
          setFilters={setFilters}
          categories={categories}
          brands={brands}
          ingredients={ingredients}
        />
      </aside>
      <div className="flex-1 flex flex-col pl-8 pr-8 pb-8">
        <section className="bg-client text-client-foreground w-full px-8 py-6 mb-8 border-border rounded-2xl">
          <div className="flex flex-row items-center">
            <h2 className="text-4xl font-extrabold mr-10 whitespace-pre-line min-w-[220px]">Los más <br /> vendidos</h2>
            <div className="flex flex-row gap-8 flex-1 items-center justify-start">
              {topProducts.map(product => (
                <TopProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        </section>
        <main className="w-full">
          <ProductsList products={filteredProducts} onAddToCart={handleAddToCart} />

        </main>
      </div>
      <LoginRequiredModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      
      {/* Notificación de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div>
              <p className="font-semibold">¡Producto agregado!</p>
              <p className="text-sm opacity-90">{addedProductName} se agregó al carrito</p>
            </div>
          </div>
        </div>
      )}
    </div>




  );
};

export default ClientCatalogPage; 
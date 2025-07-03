import ProductsFilterSidebar from '../components/ProductsFilterSidebar';
import ProductsList from '../components/ProductsList';
import { useProducts } from '../hooks/useProducts';
import TopProductCard from '../components/TopProductCard';
import { Helmet } from 'react-helmet-async';

import { useCart } from '@/modules/clients/context/CartContext';
import { useAuth } from '@/modules/core/hooks/useAuth';
import LoginRequiredModal from '@/modules/clients/components/LoginRequiredModal';
import { useState } from 'react';
import type { Product } from '@/modules/core/types/product.type';
import { FiFilter, FiX } from 'react-icons/fi';

const ClientCatalogPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [addedProductName, setAddedProductName] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

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
    <>
    <Helmet>
      <title>Catálogo de Productos Sin Gluten | Gluten Free Home</title>
      <meta name="description" content="Explora nuestro catálogo de productos certificados sin gluten. Compra seguro, fácil y rápido en Gluten Free Home." />
      <meta property="og:title" content="Catálogo de Productos Sin Gluten | Gluten Free Home" />
      <meta property="og:description" content="Explora nuestro catálogo de productos certificados sin gluten. Compra seguro, fácil y rápido en Gluten Free Home." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
    <div className="min-h-screen bg-background">
      {/* Botón de filtros para móviles y tablets */}
      <div className="xl:hidden p-3 sm:p-4 border-b border-border">
        <button
          onClick={() => setShowSidebar(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base"
        >
          <FiFilter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      <div className="flex flex-col xl:flex-row">
        {/* Sidebar - Desktop (xl y superior) */}
        <aside className="hidden xl:block w-72 bg-client text-client-foreground p-6 flex-shrink-0 border-border rounded-2xl m-4">
          <ProductsFilterSidebar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            brands={brands}
            ingredients={ingredients}
          />
        </aside>

        {/* Sidebar - Móvil y Tablet (Overlay) */}
        {showSidebar && (
          <div className="fixed inset-0 bg-black/50 z-50 xl:hidden">
            <div className="fixed left-0 top-0 h-full w-full max-w-sm bg-client text-client-foreground p-4 sm:p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Filtros</h3>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 hover:bg-muted rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <ProductsFilterSidebar
                filters={filters}
                setFilters={setFilters}
                categories={categories}
                brands={brands}
                ingredients={ingredients}
              />
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 lg:p-6 xl:p-8">
          {/* Sección de productos más vendidos */}
          <section className="bg-client text-client-foreground w-full px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 mb-6 sm:mb-8 border-border rounded-xl sm:rounded-2xl">
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-3 sm:gap-4 xl:gap-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold whitespace-pre-line xl:min-w-[220px]">
                Los más <br /> vendidos
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:gap-4 lg:gap-6 xl:gap-8 sm:flex-1 items-stretch sm:items-center sm:justify-start sm:overflow-x-auto sm:pb-2 xl:pb-0 sm:scrollbar-hide">
                {topProducts.map(product => (
                  <TopProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          </section>

          {/* Lista de productos */}
          <main className="w-full">
            <ProductsList products={filteredProducts} onAddToCart={handleAddToCart} />
          </main>
        </div>
      </div>

      <LoginRequiredModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      
      {/* Notificación de éxito */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 left-4 xl:left-auto bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm sm:text-base">¡Producto agregado!</p>
              <p className="text-xs sm:text-sm opacity-90 truncate">{addedProductName} se agregó al carrito</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default ClientCatalogPage; 
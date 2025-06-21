import ProductsFilterSidebar from '../components/ProductsFilterSidebar';
import ProductsList from '../components/ProductsList';
import { useProducts } from '../hooks/useProducts';
import TopProductCard from '../components/TopProductCard';

const ClientCatalogPage = () => {
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
            <h2 className="text-4xl font-extrabold mr-10 whitespace-pre-line min-w-[220px]">Los más <br/> vendidos</h2>
            <div className="flex flex-row gap-8 flex-1 items-center justify-start">
              {topProducts.map(product => (
                <TopProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        <main className="w-full">
          <ProductsList products={filteredProducts} />
        </main>
      </div>
    </div>
  );
};

export default ClientCatalogPage; 
import React from 'react';
import type { ProductsFilterSidebarProps } from '../types/products-components.type';

const ProductsFilterSidebar: React.FC<ProductsFilterSidebarProps> = ({ filters, setFilters, categories, brands, ingredients }) => {
  const handleMultiCheckbox = (type: 'categories' | 'brands' | 'ingredients', value: number) => {
    setFilters(prev => {
      const list = prev[type] as number[];
      const arr = list.includes(value)
        ? list.filter(v => v !== value)
        : [...list, value];
      return { ...prev, [type]: arr };
    });
  };

  const handleSingleCheckbox = (type: 'certified') => {
    setFilters(prev => ({ ...prev, [type]: !prev[type] }));
  }

  return (
    <div className="bg-client text-client-foreground h-full overflow-y-auto">
      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 tracking-wide">Filtros</h3>
      
      <div className="space-y-4 sm:space-y-6">
        {/* Filtro de certificación */}
        <div>
          <label className="flex items-center gap-2 sm:gap-3 text-sm lg:text-base font-medium cursor-pointer hover:text-secondary transition-colors p-2 rounded-lg hover:bg-muted/50">
            <input
              type="checkbox"
              checked={filters.certified}
              onChange={() => handleSingleCheckbox('certified')}
              className="accent-secondary w-4 h-4 rounded focus:ring-2 focus:ring-secondary"
            />
            <span>Solo certificados sin gluten</span>
          </label>
        </div>

        {/* Filtro de categorías */}
        {categories && categories.length > 0 && (
          <div>
            <div className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg text-primary">Categoría</div>
            <div className="space-y-1 sm:space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base cursor-pointer hover:text-accent transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-muted/50">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat.id)}
                    onChange={() => handleMultiCheckbox('categories', cat.id)}
                    className="accent-accent w-3 h-3 sm:w-4 sm:h-4 rounded focus:ring-2 focus:ring-accent"
                  />
                  <span className="truncate">{cat.nombre}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Filtro de marcas */}
        {brands && brands.length > 0 && (
          <div>
            <div className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg text-primary">Marca</div>
            <div className="space-y-1 sm:space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
              {brands.map(brand => (
                <label key={brand.id} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base cursor-pointer hover:text-accent transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-muted/50">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand.id)}
                    onChange={() => handleMultiCheckbox('brands', brand.id)}
                    className="accent-accent w-3 h-3 sm:w-4 sm:h-4 rounded focus:ring-2 focus:ring-accent"
                  />
                  <span className="truncate">{brand.nombre}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Filtro de ingredientes */}
        {ingredients && ingredients.length > 0 && (
          <div>
            <div className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base lg:text-lg text-primary">Ingredientes</div>
            <div className="space-y-1 sm:space-y-2 max-h-40 sm:max-h-48 overflow-y-auto">
              {ingredients.map(ing => (
                <label key={ing.id} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm lg:text-base cursor-pointer hover:text-accent transition-colors p-1.5 sm:p-2 rounded-lg hover:bg-muted/50">
                  <input
                    type="checkbox"
                    checked={filters.ingredients.includes(ing.id)}
                    onChange={() => handleMultiCheckbox('ingredients', ing.id)}
                    className="accent-accent w-3 h-3 sm:w-4 sm:h-4 rounded focus:ring-2 focus:ring-accent"
                  />
                  <span className="truncate">{ing.nombre}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsFilterSidebar; 
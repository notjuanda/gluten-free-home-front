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
    <div className="bg-client text-client-foreground">
      <h3 className="text-2xl font-bold mb-6 tracking-wide">Filtros</h3>
      <div className="mb-6">
        <label className="flex items-center gap-2 text-base font-medium cursor-pointer hover:text-secondary transition-colors">
          <input
            type="checkbox"
            checked={filters.certified}
            onChange={() => handleSingleCheckbox('certified')}
            className="accent-secondary w-4 h-4 rounded focus:ring-2 focus:ring-secondary"
          />
          Solo certificados sin gluten
        </label>
      </div>
      {categories && categories.length > 0 && (
        <div className="mb-6">
          <div className="font-semibold mb-2 text-lg text-primary">Categoría</div>
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2 text-base mb-1 cursor-pointer hover:text-accent transition-colors">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.id)}
                onChange={() => handleMultiCheckbox('categories', cat.id)}
                className="accent-accent w-4 h-4 rounded focus:ring-2 focus:ring-accent"
              />
              {cat.nombre}
            </label>
          ))}
        </div>
      )}
      {brands && brands.length > 0 && (
        <div className="mb-6">
          <div className="font-semibold mb-2 text-lg text-primary">Marca</div>
          {brands.map(brand => (
            <label key={brand.id} className="flex items-center gap-2 text-base mb-1 cursor-pointer hover:text-accent transition-colors">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand.id)}
                onChange={() => handleMultiCheckbox('brands', brand.id)}
                className="accent-accent w-4 h-4 rounded focus:ring-2 focus:ring-accent"
              />
              {brand.nombre}
            </label>
          ))}
        </div>
      )}
      {ingredients && ingredients.length > 0 && (
        <div>
          <div className="font-semibold mb-2 text-lg text-primary">Ingredientes</div>
          {ingredients.map(ing => (
            <label key={ing.id} className="flex items-center gap-2 text-base mb-1 cursor-pointer hover:text-accent transition-colors">
              <input
                type="checkbox"
                checked={filters.ingredients.includes(ing.id)}
                onChange={() => handleMultiCheckbox('ingredients', ing.id)}
                className="accent-accent w-4 h-4 rounded focus:ring-2 focus:ring-accent"
              />
              {ing.nombre}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsFilterSidebar; 
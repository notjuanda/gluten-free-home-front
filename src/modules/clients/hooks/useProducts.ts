import { useEffect, useState } from 'react';
import { getProducts, getTopProducts } from '@/modules/core/api/products.api';
import { getProductCategories } from '@/modules/core/api/product-category.api';
import { getBrands } from '@/modules/core/api/brand.api';
import { getIngredients } from '@/modules/core/api/ingredients.api';
import type { Product } from '@/modules/core/types/product.type';
import type { ProductCategory } from '@/modules/core/types/product-category.type';
import type { Brand } from '@/modules/core/types/brand.type';
import type { Ingredient } from '@/modules/core/types/ingredient.type';
import { getImageUrl } from '@/modules/core/utils/get-image-url';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [filters, setFilters] = useState({
    categories: [] as number[],
    brands: [] as number[],
    ingredients: [] as number[],
    certified: false,
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const productsData = await getProducts();
            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products:", error);
        }

        try {
            const topProductsData = await getTopProducts(5);
            const processedTopProducts = topProductsData.map(p => ({
                ...p,
                imagenes: p.imagenes?.map(img => ({
                    ...img,
                    urlImagen: getImageUrl(img.urlImagen)
                }))
            }));
            setTopProducts(processedTopProducts);
        } catch (error) {
            console.error("Error fetching top products:", error);
        }
        
        try {
            const categoriesData = await getProductCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories (is the endpoint public?):", error);
            setCategories([]); // Set as empty on error
        }
        
        try {
            const brandsData = await getBrands();
            setBrands(brandsData);
        } catch (error) {
            console.error("Error fetching brands (is the endpoint public?):", error);
            setBrands([]); // Set as empty on error
        }

        try {
            const ingredientsData = await getIngredients();
            setIngredients(ingredientsData);
        } catch (error) {
            console.error("Error fetching ingredients (is the endpoint public?):", error);
            setIngredients([]); // Set as empty on error
        }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (filters.certified) {
      filtered = filtered.filter(p => p.certificadoSinGluten);
    }

    if (filters.categories.length > 0) {
      filtered = filtered.filter(p => filters.categories.includes(p.categoria.id));
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => p.marca && filters.brands.includes(p.marca.id));
    }

    if (filters.ingredients.length > 0) {
      filtered = filtered.filter(p =>
        p.ingredientes?.some(ing => filters.ingredients.includes(ing.id))
      );
    }
    
    setFilteredProducts(filtered);
  }, [products, filters]);

  return {
    products,
    topProducts,
    filters,
    setFilters,
    filteredProducts,
    categories,
    brands,
    ingredients,
  };
}; 
import { useParams } from 'react-router-dom';
import { useGetProduct } from '@/modules/admin/hooks/productos/useGetProduct';
import ProductDetail from '../components/ProductDetail';
import { useCart } from '../context/CartContext';
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { RecommendedProductsSection } from '../components/RecommendedProducts';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { product, loading, error, refetch } = useGetProduct();
    const { addToCart } = useCart();
    const { topProducts } = useProducts();

    // Obtener producto al montar o cuando cambia el id
    React.useEffect(() => {
        if (id) refetch(Number(id));
    }, [id, refetch]);

    if (loading) return <div className="text-center py-16">Cargando producto...</div>;
    if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-16 text-muted-foreground">Producto no encontrado.</div>;

    return (
        <>
        <ProductDetail product={product} onAddToCart={addToCart} />
        <RecommendedProductsSection products={topProducts} onAddToCart={addToCart} />
        </>
    );
};

export default ProductDetailPage; 
import { useParams } from 'react-router-dom';
import { useGetProduct } from '@/modules/admin/hooks/productos/useGetProduct';
import ProductDetail from '../components/ProductDetail';
import { useCart } from '../context/CartContext';
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { RecommendedProductsSection } from '../components/RecommendedProducts';
import { Helmet } from 'react-helmet-async';

const ProductDetailPage = () => {
    const { slug } = useParams();
    const { product, loading, error, refetch } = useGetProduct();
    const { addToCart } = useCart();
    const { topProducts } = useProducts();

    // Obtener producto al montar o cuando cambia el slug
    React.useEffect(() => {
        if (slug) refetch(slug);
    }, [slug, refetch]);

    if (loading) return (
        <>
            <Helmet>
                <title>Cargando producto... | Gluten Free Home</title>
            </Helmet>
            <div className="text-center py-16">Cargando producto...</div>
        </>
    );
    if (error) return <div className="text-center py-16 text-red-500">{error}</div>;
    if (!product) return <div className="text-center py-16 text-muted-foreground">Producto no encontrado.</div>;

    return (
        <>
        <Helmet>
            <title>{product.nombre} | Comprar sin gluten | Gluten Free Home</title>
            <meta name="description" content={product.descripcion || product.nombre} />
            <meta property="og:title" content={product.nombre} />
            <meta property="og:description" content={product.descripcion || product.nombre} />
            {product.imagenes && product.imagenes[0] && (
                <meta property="og:image" content={import.meta.env.VITE_API_BASE_URL + product.imagenes[0].urlImagen} />
            )}
            <meta property="og:type" content="product" />
            <meta property="og:url" content={window.location.href} />
        </Helmet>
        <ProductDetail product={product} onAddToCart={addToCart} />
        <RecommendedProductsSection products={topProducts} onAddToCart={addToCart} />
        </>
    );
};

export default ProductDetailPage; 
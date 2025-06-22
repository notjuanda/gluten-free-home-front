import { useProductImages } from '../hooks/useProductImages';
import type { ProductDetailProps } from '../types/products-components.type';

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart }) => {
    const { images } = useProductImages(product.id);
    const mainImageSrc = images && images.length > 0 ? images[0].urlImagen : '/logo-gluten-free-home.png';

    return (
        <div className="w-full max-w-4xl mx-auto bg-background text-foreground rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-8 border border-border animate-fade-in">
        <div className="flex-shrink-0 flex justify-center items-center w-full md:w-1/2">
            <img src={mainImageSrc} alt={product.nombre} className="w-64 h-64 object-contain rounded-lg bg-muted" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
            <h1 className="font-bold text-2xl mb-1">{product.nombre}</h1>
            <span className="text-xl font-semibold text-primary">Bs {product.precioBob}</span>
            <p className="text-sm text-muted-foreground mb-2">{product.descripcion}</p>
            <div className="flex flex-wrap gap-2 mb-2">
            {product.marca && <span className="border border-primary/20 rounded px-2 py-0.5 text-xs font-semibold">Marca: {product.marca.nombre}</span>}
            <span className="border border-primary/20 rounded px-2 py-0.5 text-xs font-semibold">Categoría: {product.categoria?.nombre}</span>
            {product.certificadoSinGluten && <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">🌾 Sin Gluten</span>}
            </div>
            {product.ingredientes && product.ingredientes.length > 0 && (
            <div className="mb-2">
                <span className="font-semibold text-xs">Ingredientes:</span>
                <ul className="text-xs text-muted-foreground list-disc ml-4">
                {product.ingredientes.map((ing) => (
                    <li key={ing.id}>{ing.nombre}</li>
                ))}
                </ul>
            </div>
            )}
            <button onClick={() => onAddToCart(product)} className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold hover:bg-primary/90 transition w-fit">Agregar al carrito</button>
        </div>
        </div>
    );
};

export default ProductDetail; 
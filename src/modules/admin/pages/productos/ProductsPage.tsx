import { useProducts } from '../../hooks/productos/useProducts';
import ProductsList from '../../components/productos/ProductsList';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

export default function ProductsPage() {
    const { products, loading, error, refetch } = useProducts();
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] from-primary/5 via-background to-primary/10 px-2 sm:px-0">
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-6 py-5 rounded-b-2xl shadow-md mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Productos</h1>
                <button
                    className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-primary/90 transition"
                    aria-label="Crear producto"
                    onClick={() => navigate('/admin/productos/crear')}
                >
                    <FiPlus className="w-5 h-5" />
                    <span className="hidden sm:inline">Agregar</span>
                </button>
            </div>
            <ProductsList products={products} loading={loading} error={error} refreshTrigger={refetch} />
        </div>
    );
} 
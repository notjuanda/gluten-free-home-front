import ProductForm from '../../components/productos/ProductForm';
import { useNavigate } from 'react-router-dom';

export default function CreateProductPage() {
    const navigate = useNavigate();

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-cap-heading-2 text-foreground mb-6">Crear producto</h1>
        <ProductForm onSubmit={() => navigate('/admin/productos')} />
        </div>
    );
} 
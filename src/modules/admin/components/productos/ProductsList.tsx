import type { ProductsListPropsWithRefresh } from "../../types/products-components.type";
import { FiBox, FiCheckCircle, FiXCircle, FiEdit2 } from 'react-icons/fi';
import ProductDeleteButton from './ProductDeleteButton';
import EditProductModal from './EditProductModal';
import ViewImagesButton from './ViewImagesButton';
import UploadImageButton from './UploadImageButton';
import { useEffect, useState } from 'react';


export default function ProductsList({ products, loading, error, refreshTrigger }: ProductsListPropsWithRefresh) {
    const [editId, setEditId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleDeleted = () => {
        if (refreshTrigger) refreshTrigger();
    };
    const handleEdit = (id: number) => {
        setEditId(id);
        setModalOpen(true);
    };
    const handleClose = () => {
        setModalOpen(false);
        setEditId(null);
    };

    useEffect(() => {}, [products]);

    if (loading) return (
        <div className="flex flex-col items-center py-16 animate-fade-in">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <span className="text-muted-foreground text-lg font-medium">Cargando productos...</span>
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-red-500">
            <FiBox className="h-10 w-10 mb-2" />
            <span className="font-semibold">{error}</span>
        </div>
    );
    if (!products.length) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-muted-foreground">
            <FiBox className="h-10 w-10 mb-2" />
            <span className="font-semibold">No hay productos registrados.</span>
        </div>
    );

    return (
        <>
        <EditProductModal open={modalOpen} onClose={handleClose} productId={editId} onUpdated={refreshTrigger} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="relative group border border-primary/10 rounded-2xl shadow-xl p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <ViewImagesButton 
                            productId={product.id} 
                            productName={product.nombre} 
                        />
                        <UploadImageButton 
                            productId={product.id} 
                            productName={product.nombre} 
                        />
                        <button
                            className="p-2 rounded-full bg-background border border-border shadow hover:bg-primary/10 text-primary hover:text-primary-dark transition"
                            title="Editar"
                            onClick={() => handleEdit(product.id)}
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <ProductDeleteButton id={product.id} name={product.nombre} onDeleted={handleDeleted} />
                    </div>
                    <div className="flex items-center gap-3 w-full mb-2">
                        <div className="rounded-full p-2 border border-primary/20">
                            <FiBox className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-extrabold text-lg text-foreground tracking-tight truncate">{product.nombre}</div>
                            <span className="inline-block border border-primary/20 text-primary px-2 py-0.5 rounded text-xs font-semibold bg-transparent">ID: {product.id}</span>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2 mb-1">{product.descripcion || 'Sin descripción.'}</div>
                    <div className="flex flex-wrap gap-2 items-center text-xs">
                        <span className="font-semibold text-primary">{product.precioBob} BOB</span>
                        {product.precioUsd && <span className="text-muted-foreground">/ {product.precioUsd} USD</span>}
                        <span className="ml-auto">Stock: <span className="font-semibold">{product.stock}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center text-xs mt-1">
                        {product.marca && <span className="border border-primary/20 rounded px-2 py-0.5">Marca: {product.marca.nombre}</span>}
                        <span className="border border-primary/20 rounded px-2 py-0.5">Categoría: {product.categoria?.nombre}</span>
                    </div>
                    {product.ingredientes && product.ingredientes.length > 0 && (
                        <div className="flex flex-wrap gap-1 items-center text-xs mt-1">
                            <span className="text-muted-foreground">Ingredientes:</span>
                            {product.ingredientes.map((ing) => (
                                <span key={ing.id} className="border border-primary/10 rounded px-2 py-0.5 bg-transparent">{ing.nombre}</span>
                            ))}
                        </div>
                    )}
                    <div className="flex gap-2 items-center mt-2">
                        {product.activo ? (
                            <span className="flex items-center gap-1 text-green-600 text-xs font-semibold"><FiCheckCircle />Activo</span>
                        ) : (
                            <span className="flex items-center gap-1 text-red-500 text-xs font-semibold"><FiXCircle />Inactivo</span>
                        )}
                        {product.certificadoSinGluten && (
                            <span className="flex items-center gap-1 text-primary text-xs font-semibold ml-2"><FiCheckCircle />Certificado sin gluten</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
        </>
    );
} 
import { useGetBrands } from '../../hooks/brands/useGetBrands';
import { FiTag, FiEdit2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import BrandDeleteButton from './BrandDeleteButton';
import EditBrandModal from './EditBrandModal';
import type { BrandsListProps } from '../../types/brands-components.type';

export default function BrandsList({ refreshTrigger }: BrandsListProps) {
    const { brands, loading, error, refetch } = useGetBrands();
    const [editId, setEditId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (refreshTrigger !== undefined) {
            refetch();
        }
    }, [refreshTrigger, refetch]);

    const handleEdit = (id: number) => {
        setEditId(id);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setEditId(null);
    };

    if (loading) return (
        <div className="flex flex-col items-center py-16 animate-fade-in">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <span className="text-muted-foreground text-lg font-medium">Cargando marcas...</span>
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-red-500">
            <FiTag className="h-10 w-10 mb-2" />
            <span className="font-semibold">Error: {error}</span>
        </div>
    );
    if (!brands?.length) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-muted-foreground">
            <FiTag className="h-10 w-10 mb-2" />
            <span className="font-semibold">No hay marcas registradas.</span>
        </div>
    );

    return (
        <>
        <EditBrandModal open={modalOpen} onClose={handleClose} brandId={editId} onUpdated={refetch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {brands.map((brand) => (
                <div
                    key={brand.id}
                    className="relative group border border-primary/10 rounded-2xl shadow-xl p-6 flex flex-col items-start gap-3 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                >
                    {/* Botones de acción */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                            className="p-2 rounded-full bg-background border border-border shadow hover:bg-primary/10 text-primary hover:text-primary-dark transition"
                            title="Editar"
                            onClick={() => handleEdit(brand.id)}
                        >
                            <FiEdit2 className="w-4 h-4" />
                        </button>
                        <BrandDeleteButton id={brand.id} name={brand.nombre} onDeleted={refetch} />
                    </div>
                    <div className="flex items-center gap-3 w-full">
                        <div className="rounded-full p-2 border border-primary/20">
                            <FiTag className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1">
                            <div className="font-extrabold text-lg text-foreground tracking-tight mb-1 truncate">{brand.nombre}</div>
                            <span className="inline-block border border-primary/20 text-primary px-2 py-0.5 rounded text-xs font-semibold bg-transparent">ID: {brand.id}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    );
} 
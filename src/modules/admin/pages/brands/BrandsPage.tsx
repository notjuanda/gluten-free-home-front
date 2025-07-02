import BrandsList from '../../components/brands/BrandsList';
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import CreateBrandModal from '../../components/brands/CreateBrandModal';

export default function BrandsPage() {
    const [open, setOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    return (
        <div className="min-h-[80vh] from-primary/5 via-background to-primary/10 px-2 sm:px-0">
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-card/80 backdrop-blur-xl border-b border-border/40 flex items-center justify-between px-6 py-5 rounded-b-2xl shadow-md mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">Marcas registradas</h1>
                <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-primary/90 transition">
                    <FiPlus className="w-5 h-5" />
                    <span className="hidden sm:inline">Agregar</span>
                </button>
            </div>
            <BrandsList refreshTrigger={refreshTrigger} />
            <CreateBrandModal open={open} onClose={() => setOpen(false)} onCreated={() => setRefreshTrigger(t => t + 1)} />
        </div>
    );
} 
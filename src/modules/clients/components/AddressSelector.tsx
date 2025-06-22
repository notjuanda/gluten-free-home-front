import { useState } from 'react';
import { useMyAddresses } from '../hooks/useMyAddresses';
import { Loader2, MapPin, PlusCircle } from 'lucide-react';
import type { Address } from '@/modules/core/types/address.type';
import clsx from 'clsx';
import AddAddressModal from './AddAddressModal';

interface AddressSelectorProps {
    selectedAddressId: number | null;
    onSelectAddress: (id: number) => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ selectedAddressId, onSelectAddress }) => {
    const { data: addresses, isLoading, error } = useMyAddresses();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Cargando direcciones...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
                Error al cargar las direcciones: {error.message}
            </div>
        );
    }
    
    return (
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Elige una dirección de envío</h2>
            
            {addresses && addresses.length > 0 ? (
                <div className="space-y-3">
                    {addresses.map((address: Address) => (
                        <div
                            key={address.id}
                            onClick={() => onSelectAddress(address.id)}
                            className={clsx(
                                "flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                                selectedAddressId === address.id
                                    ? 'bg-primary/10 border-primary shadow-md'
                                    : 'bg-muted/25 border-transparent hover:border-primary/50'
                            )}
                        >
                            <MapPin className={clsx(
                                "h-6 w-6 mt-1 shrink-0",
                                selectedAddressId === address.id ? 'text-primary' : 'text-muted-foreground'
                            )} />
                            <div>
                                <p className="font-semibold">{address.linea1}</p>
                                <p className="text-sm text-muted-foreground">
                                    {address.ciudad}, {address.departamento}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">{address.linea2}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-4">
                    No tienes direcciones guardadas.
                </p>
            )}

            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
                <PlusCircle className="h-5 w-5" />
                Agregar Nueva Dirección
            </button>

            <AddAddressModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default AddressSelector; 
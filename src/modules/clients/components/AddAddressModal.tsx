import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/modules/core/hooks/useAuth';
import { useCreateAddress } from '../hooks/useCreateAddress';
import { addressSchema, type AddressSchema } from '../schemas/address.schema';
import { X, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const { mutate: createAddress, isPending } = useCreateAddress();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddressSchema>({
        resolver: zodResolver(addressSchema),
    });
    
    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const onSubmit = (data: AddressSchema) => {
        if (!user) {
            // Esto no debería pasar si el flujo es correcto, pero es una buena práctica.
            alert('Debes iniciar sesión para agregar una dirección.');
            return;
        }

        createAddress(
            { ...data, usuarioId: user.id },
            {
                onSuccess: () => {
                    onClose();
                },
            },
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-lg p-6 bg-card text-card-foreground rounded-2xl shadow-xl m-4">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="h-6 w-6" />
                </button>
                <h2 className="text-2xl font-bold mb-6">Agregar Nueva Dirección</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="linea1" className="block text-sm font-medium mb-1">Dirección (Línea 1)</label>
                        <input id="linea1" {...register('linea1')} className="w-full bg-input rounded-md px-3 py-2" />
                        {errors.linea1 && <p className="text-red-500 text-xs mt-1">{errors.linea1.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="linea2" className="block text-sm font-medium mb-1">Referencia (Línea 2) (Opcional)</label>
                        <input id="linea2" {...register('linea2')} className="w-full bg-input rounded-md px-3 py-2" />
                        {errors.linea2 && <p className="text-red-500 text-xs mt-1">{errors.linea2.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="ciudad" className="block text-sm font-medium mb-1">Ciudad</label>
                            <input id="ciudad" {...register('ciudad')} className="w-full bg-input rounded-md px-3 py-2" />
                            {errors.ciudad && <p className="text-red-500 text-xs mt-1">{errors.ciudad.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="departamento" className="block text-sm font-medium mb-1">Departamento</label>
                            <input id="departamento" {...register('departamento')} className="w-full bg-input rounded-md px-3 py-2" />
                            {errors.departamento && <p className="text-red-500 text-xs mt-1">{errors.departamento.message}</p>}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button type="submit" disabled={isPending} className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center">
                            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Guardar Dirección'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAddressModal; 
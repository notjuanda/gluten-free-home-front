import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAddress } from '@/modules/core/api/addresses.api';
import type { CreateAddressInput } from '@/modules/core/types/address.type';
import { toast } from 'react-toastify';

export const useCreateAddress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateAddressInput) => createAddress(data),
        onSuccess: () => {
            toast.success('Dirección agregada correctamente');
            // Invalida la query de direcciones para que se vuelva a cargar
            queryClient.invalidateQueries({ queryKey: ['my-addresses'] });
        },
        onError: (error) => {
            toast.error(`Error al agregar la dirección: ${error.message}`);
        },
    });
}; 
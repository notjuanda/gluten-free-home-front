import { useQuery } from '@tanstack/react-query';
import { getMyAddresses } from '@/modules/core/api/addresses.api';

export const useMyAddresses = () => {
    return useQuery({
        queryKey: ['my-addresses'],
        queryFn: getMyAddresses,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
}; 
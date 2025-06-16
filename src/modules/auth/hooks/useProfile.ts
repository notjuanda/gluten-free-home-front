import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api/me.api';
import type { User } from '@/modules/core/types/login.type';

export const useProfile = () =>
    useQuery<User, Error>({
        queryKey: ['me'],
        queryFn: profileApi,
        staleTime: 60 * 1000,
    }
);

import api from './instance.api';
import type { Address } from '../types/address.type';
import type {
    CreateAddressInput ,
    UpdateAddressInput ,
} from '../types/address.type';

/** GET /addresses  */
export const getAddresses = async (): Promise<Address[]> =>
    (await api.get<Address[]>('/addresses')).data;

/** GET /addresses/:id */
export const getAddress = async (id: number): Promise<Address> =>
    (await api.get<Address>(`/addresses/${id}`)).data;

/** POST /addresses */
export const createAddress = async (
    payload: CreateAddressInput,
): Promise<Address> =>
    (await api.post<Address>('/addresses', payload)).data;

/** PATCH /addresses/:id */
export const updateAddress = async (
    id: number,
    payload: UpdateAddressInput,
): Promise<Address> =>
    (await api.patch<Address>(`/addresses/${id}`, payload)).data;

/** DELETE /addresses/:id */
export const deleteAddress = async (id: number): Promise<void> => {
    await api.delete(`/addresses/${id}`);
};

/** GET /addresses/usuario/:usuarioId */
export const getUserAddresses = async (
    usuarioId: number,
): Promise<Address[]> =>
    (await api.get<Address[]>(`/addresses/usuario/${usuarioId}`)).data;

export const getMyAddresses = async (): Promise<Address[]> => {
    const { data } = await api.get<Address[]>('/addresses/me');
    return data;
};

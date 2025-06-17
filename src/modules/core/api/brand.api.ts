import api from './instance.api';
import type {
    Brand,
    CreateBrandInput,
    UpdateBrandInput,
} from '../types/brand.type';

export const getBrands = async (): Promise<Brand[]> =>
    (await api.get<Brand[]>('/brands')).data;

export const getBrand = async (id: number): Promise<Brand> =>
    (await api.get<Brand>(`/brands/${id}`)).data;

export const createBrand = async (payload: CreateBrandInput): Promise<Brand> =>
    (await api.post<Brand>('/brands', payload)).data;

export const updateBrand = async (
    id: number,
    payload: UpdateBrandInput,
): Promise<Brand> =>
    (await api.patch<Brand>(`/brands/${id}`, payload)).data;

export const deleteBrand = async (id: number): Promise<void> => {
    await api.delete(`/brands/${id}`);
};

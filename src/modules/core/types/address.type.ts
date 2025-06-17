import type { User } from '@/modules/admin/types/users.types';

export interface Address {
    id: number;
    linea1: string;
    linea2?: string;
    ciudad: string;
    departamento: string;
    codigoPostal?: string;
    pais: string;

    usuario?: User;

    createdAt: string;
    updatedAt: string;
}

export interface CreateAddressInput {
    linea1: string;
    linea2?: string;
    ciudad: string;
    departamento: string;
    codigoPostal?: string;
    pais?: string;
    usuarioId: number;
}

export type UpdateAddressInput = Partial<CreateAddressInput>;
import type { Permission } from './permission.type';

export type Role = {
    id: number;
    nombre: string;
    permisos: Permission[];
};

export interface CreateRoleInput {
    nombre: string;
    permisosIds?: number[];
}

export type UpdateRoleInput = Partial<CreateRoleInput>;

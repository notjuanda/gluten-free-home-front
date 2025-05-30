import type { Permission } from './permission.type';

export type Role = {
    id: number;
    nombre: string;
    permisos: Permission[];
};
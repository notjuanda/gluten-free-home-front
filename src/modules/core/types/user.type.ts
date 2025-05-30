import type { Role } from './role.type';

export type User = {
    id: number;
    nombreUsuario: string;
    correo: string;
    nombreCompleto?: string;
    roles: Role[];
};
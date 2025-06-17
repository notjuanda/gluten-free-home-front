export interface User {
    id: number;
    nombreUsuario: string;
    correo: string;
    nombreCompleto?: string;
    telefono?: string;
    estadoCorreo: 'NO_VERIFICADO' | 'verificado';
    roles: { id: number; nombre: string }[];
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserInput {
    nombreUsuario: string;
    correo: string;
    contraseña: string;
    nombreCompleto?: string;
    telefono?: string;
    rolesIds?: number[];
}

export interface UpdateUserInput {
    nombreUsuario?: string;
    correo?: string;
    contraseña?: string;
    nombreCompleto?: string;
    telefono?: string;
    rolesIds?: number[];
}

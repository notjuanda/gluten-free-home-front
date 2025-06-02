import type { User } from '@/modules/core/types/user.type';

export type LoginRequest = {
    correo: string;
    contraseña: string;
};

export type RegisterRequest = {
    nombreUsuario: string;
    correo: string;
    contraseña: string;
    nombreCompleto?: string;
    telefono?: string;
};

export type LoginResponse = {
    message: string;
    user: User;
};

export type RegisterResponse = {
    message: string;
};

export type VerifyEmailResponse = {
    message: string;
};

export type LogoutResponse = {
    message: string;
};

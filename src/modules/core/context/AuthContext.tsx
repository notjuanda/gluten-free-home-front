import { createContext } from 'react';
import type { User } from '../types/login.type';

export interface AuthContextState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (correo: string, contraseña: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

import type { User } from "./users.types";

export interface UserListProps {
    users: User[];
    loading: boolean;
    error: string | null;
    onUserUpdated?: (u: User) => void;
}

export interface AddUserModalProps {
    onCreated?: (user: User) => void;
}

export interface AssignRolesModalProps {
    user: User;
    open: boolean;
    onClose: () => void;
    onUpdated?: (u: User) => void;
}

import type { User } from "./users.types";

export interface UserListProps {
    users: User[];
    loading: boolean;
    error: string | null;
    onUserUpdated?: (u: User) => void;
}
 
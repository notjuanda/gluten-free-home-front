import type { User } from '@/modules/admin/types/users.types';

export interface AssignRolesModalProps {
    user: User;
    open: boolean;
    onClose: () => void;
    onUpdated?: (u: User) => void;
}

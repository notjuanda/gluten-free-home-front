import type { User } from "@/modules/admin/types/users.types";

export interface AdminSidebarProps {
    user?: User;
    logout?: () => void;
    children?: React.ReactNode;
}
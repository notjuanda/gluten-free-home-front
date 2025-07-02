import type { Role } from "@/modules/core/types/role.type";
import type { Permission } from "@/modules/core/types/permission.type";
import type { RoleFormSchema } from "../schemas/role.schema";

export interface RoleListProps {
    roles: Role[]
    loading: boolean
    error: string | null
    onRoleDeleted: (id: number) => void
}

export interface RoleHeaderProps {
    id: number
    name: string
}

export interface RoleFormProps {
    defaultValues?: { nombre?: string; permisos?: Permission[] };
    loadingSubmit: boolean;
    errorSubmit: string | null;
    onSubmit: (data: RoleFormSchema) => void;
    onCancel: () => void;
}

export interface deleteRoleProps {
    id: number
    name: string
    onDeleted: () => void
}

export interface PermissionBadgeProps {
    permissions: Permission[];
}
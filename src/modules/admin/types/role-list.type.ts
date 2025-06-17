import type { Role } from "@/modules/core/types/role.type";

export interface RoleListProps {
    roles: Role[]
    loading: boolean
    error: string | null
    onRoleDeleted: (id: number) => void
}
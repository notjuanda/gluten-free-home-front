import type { Permission } from "@/modules/core/types/permission.type";
import type { RoleFormSchema } from "../schemas/role.schema";

export interface RoleFormProps {
    defaultValues?: { nombre?: string; permisos?: Permission[] };
    loadingSubmit: boolean;
    errorSubmit: string | null;
    onSubmit: (data: RoleFormSchema) => void;
    onCancel: () => void;
}
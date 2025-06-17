import { useEffect, useState } from 'react';
import { Plus }                from 'lucide-react';

import RolesList          from '../../components/roles/RolesList';
import { ActionButton }   from '@/shared/ui/ActionButton';
import { useGetRoles }    from '../../hooks/roles/useGetRoles';
import type { Role }      from '@/modules/core/types/role.type';

export default function RolesPage() {
    const { roles, loading, error } = useGetRoles();
    const [localRoles, setLocalRoles] = useState<Role[]>([]);

    useEffect(() => {
        if (roles) setLocalRoles(roles);
    }, [roles]);

    const handleCreateRole = () => {
        console.log('Abrir modal crear rol');
    };

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-cap-heading-2 text-foreground">
            Roles y Permisos
            </h1>

            <ActionButton
            onClick={handleCreateRole}
            iconLeft={<Plus size={18} />}
            variant="primary"
            className="p-2"
            >
            <span className="sr-only">Crear rol</span>
            </ActionButton>
        </header>

        <RolesList roles={localRoles} loading={loading} error={error} />
        </div>
    );
}

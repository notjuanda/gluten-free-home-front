import { useNavigate } from 'react-router-dom';
import { useCreateRole } from '@/modules/admin/hooks/roles/useCreateRole';
import RoleForm from '@/modules/admin/components/roles/RoleForm';
import type { RoleFormSchema } from '@/modules/admin/schemas/role.schema';

export default function CreateRolePage() {
    const navigate = useNavigate();
    const { create, loading, error } = useCreateRole();

    const handleSubmit = async (values: RoleFormSchema) => {
        const created = await create(values);
        if (created) navigate('/admin/permisos');
    };

    return (
        <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
            <h1 className="text-2xl font-cap-heading-2 text-foreground">
                Crear nuevo rol
            </h1>
            <RoleForm
                loadingSubmit={loading}
                errorSubmit={error}
                onSubmit={handleSubmit}
                onCancel={() => navigate(-1)}
            />
        </div>
    );
}

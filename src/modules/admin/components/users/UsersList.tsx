import { useGetUsers } from '../../hooks/users/useGetUsers';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { CustomTable } from '@/shared/ui/Table';
import type { User } from '@/modules/core/types/user.type';
import type { Column } from '@/shared/ui/Table';

export default function UsersList() {
    const { users, loading, error } = useGetUsers();

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    const columns: Column<User>[] = [
        { key: 'id', label: 'ID' },
        { key: 'nombreUsuario', label: 'Nombre Usuario' },
        { key: 'correo', label: 'Correo' },
        {
            key: 'nombreCompleto',
            label: 'Nombre Completo',
            render: (row) => (
                <span className="hidden lg:inline">{row.nombreCompleto}</span>
            ),
        },
        {
            key: 'roles',
            label: 'Roles',
            render: (row) => row.roles.map((r) => r.nombre).join(', '),
        },
    ];

    return (
        <section className="mx-auto max-w-6xl px-4 py-6">
            <h1 className="mb-6 text-2xl font-cap-heading-2 text-foreground">
                Lista de Usuarios
            </h1>

            <CustomTable<User>
                columns={columns}
                data={users ?? []}
                emptyMessage="No hay usuarios registrados."
            />
        </section>
    );
}

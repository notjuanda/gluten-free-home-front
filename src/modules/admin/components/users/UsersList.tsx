import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { CustomTable } from '@/shared/ui/Table';
import type { User } from '../../types/users.types';
import type { Column } from '@/shared/ui/Table';
import { Chip } from '@mui/material';

interface Props {
    users: User[];
    loading: boolean;
    error: string | null;
}

export default function UsersList({ users, loading, error }: Props) {
    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    const columns: Column<User>[] = [
        {
            key: 'id',
            label: 'ID',
            render: (row) => (
                <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    #{row.id}
                </span>
            ),
        },
        { key: 'nombreUsuario', label: 'Usuario' },
        { key: 'correo', label: 'Correo' },
        {
            key: 'nombreCompleto',
            label: 'Nombre Completo',
            render: (row) => row.nombreCompleto || '—',
        },
        {
            key: 'telefono',
            label: 'Teléfono',
            render: (row) => row.telefono || '—',
        },
        {
            key: 'estadoCorreo',
            label: 'Estado Correo',
            render: (row) => (
                <Chip
                    label={
                        row.estadoCorreo === 'verificado'
                            ? 'Verificado'
                            : 'No Verificado'
                    }
                    color={row.estadoCorreo === 'verificado' ? 'success' : 'default'}
                    size="small"
                    variant="outlined"
                />
            ),
        },
        {
            key: 'roles',
            label: 'Roles',
            render: (row) =>
                row.roles.length > 0
                    ? row.roles.map((r) => r.nombre).join(', ')
                    : '—',
        },
        {
            key: 'createdAt',
            label: 'Creado',
            render: (row) =>
                new Date(row.createdAt).toLocaleString('es-BO', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
        },
        {
            key: 'updatedAt',
            label: 'Actualizado',
            render: (row) =>
                new Date(row.updatedAt).toLocaleString('es-BO', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
        },
    ];

    return (
        <CustomTable<User>
            columns={columns}
            data={users}
            emptyMessage="No hay usuarios registrados."
        />
    );
}

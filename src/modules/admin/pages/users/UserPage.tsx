import { useEffect, useState } from 'react';

import AddUserModal  from '../../components/users/AddUserModal';
import UsersList     from '../../components/users/UsersList';

import { useGetUsers } from '@/modules/admin/hooks/users/useGetUsers';
import type { User }   from '../../types/users.types';

export default function UsersPage() {
    const { users, loading, error } = useGetUsers();
    const [localUsers, setLocalUsers] = useState<User[]>([]);

    useEffect(() => {
        if (users) setLocalUsers(users);
    }, [users]);

    const handleUserCreated = (newUser: User) => {
        setLocalUsers(prev => [...prev, newUser]);
    };

    const handleUserUpdated = (updated: User) => {
        setLocalUsers(prev =>
        prev.map(u => (u.id === updated.id ? updated : u)),
        );
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-cap-heading-2 text-foreground">
            Lista de Usuarios
            </h1>
            <AddUserModal onCreated={handleUserCreated} />
        </div>
        <UsersList
            users={localUsers}
            loading={loading}
            error={error}
            onUserUpdated={handleUserUpdated}
        />
        </div>
    );
}

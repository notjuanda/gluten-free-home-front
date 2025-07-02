import { useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Chip } from '@mui/material';
import { ActionButton } from '@/shared/ui/ActionButton';
import { UserCog, ChevronDown, ChevronUp, Mail, User, Phone, ShieldCheck, CalendarDays, RefreshCcw } from 'lucide-react';
import type { User as UserType } from '../../types/users.types';
import AssignRolesModal from './AssignRolesModal';
import type { UserListProps } from '../../types/users-components.type';

export default function UsersList({
  users,
  loading,
  error,
  onUserUpdated,
}: UserListProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {users.length === 0 && (
        <div className="text-center text-muted-foreground py-8">No hay usuarios registrados.</div>
      )}
      {users.map((user) => {
        const isExpanded = expandedId === user.id;
        return (
          <div
            key={user.id}
            className={`bg-card rounded-xl shadow border transition-all duration-300 ${isExpanded ? 'ring-2 ring-primary/40 scale-[1.01]' : 'hover:shadow-lg'} overflow-hidden`}
          >
            <button
              className="w-full flex justify-between items-center p-4 focus:outline-none group"
              onClick={() => handleExpand(user.id)}
              aria-expanded={isExpanded}
              aria-controls={`user-details-${user.id}`}
            >
              <div className="flex items-center gap-3 text-left">
                <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full w-10 h-10 font-bold text-lg">
                  {user.nombreUsuario?.[0]?.toUpperCase() || <User size={20} />}
                </span>
                <div>
                  <div className="font-semibold text-base text-foreground flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" />
                    {user.nombreUsuario}
                    <span className="ml-2 inline-block px-2 py-0.5 rounded bg-muted text-xs font-medium text-muted-foreground border border-muted-foreground/20">
                      {user.roles && user.roles.length > 0 ? user.roles[0].nombre : 'Sin rol'}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail size={14} className="text-muted-foreground" />
                    {user.correo}
                  </div>
                </div>
              </div>
              <span className="ml-2 text-primary group-hover:scale-125 transition-transform">
                {isExpanded ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </span>
            </button>
            <div
              id={`user-details-${user.id}`}
              className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 py-4 px-6' : 'grid-rows-[0fr] opacity-0 py-0 px-6'} bg-muted/10`}
              style={{
                gridTemplateRows: isExpanded ? '1fr' : '0fr',
              }}
            >
              <div className={`overflow-hidden ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-muted-foreground" />
                    <span className="font-medium">Nombre completo:</span>
                    <span>{user.nombreCompleto || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    <span className="font-medium">Teléfono:</span>
                    <span>{user.telefono || '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-muted-foreground" />
                    <span className="font-medium">Estado correo:</span>
                    <Chip
                      label={user.estadoCorreo === 'verificado' ? 'Verificado' : 'No Verificado'}
                      color={user.estadoCorreo === 'verificado' ? 'success' : 'default'}
                      size="small"
                      variant="outlined"
                      className="ml-1"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-muted-foreground" />
                    <span className="font-medium">Roles:</span>
                    <span>{user.roles.length ? user.roles.map((r) => r.nombre).join(', ') : '—'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-muted-foreground" />
                    <span className="font-medium">Creado:</span>
                    <span>{new Date(user.createdAt).toLocaleString('es-BO', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCcw size={16} className="text-muted-foreground" />
                    <span className="font-medium">Actualizado:</span>
                    <span>{new Date(user.updatedAt).toLocaleString('es-BO', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <ActionButton
                    iconLeft={<UserCog size={18} />}
                    variant="primary"
                    onClick={() => setSelectedUser(user)}
                    className="p-2 font-semibold shadow-sm hover:shadow-md"
                    aria-label={`Asignar roles a ${user.nombreUsuario}`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {selectedUser && (
        <AssignRolesModal
          user={selectedUser}
          open
          onClose={() => setSelectedUser(null)}
          onUpdated={(u) => {
            onUserUpdated?.(u);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

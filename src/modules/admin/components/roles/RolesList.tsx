import LoadingSpinner   from '@/components/ui/LoadingSpinner';
import ErrorMessage     from '@/components/ui/ErrorMessage';
import { ChevronDown }  from 'lucide-react';

import PermissionBadges from './PermissionBadge';
import type { Role }    from '@/modules/core/types/role.type';

interface Props {
    roles:   Role[];
    loading: boolean;
    error:   string | null;
}

export default function RolesList({ roles, loading, error }: Props) {
    if (loading) return <LoadingSpinner />;
    if (error)   return <ErrorMessage message={error} />;
    if (!roles.length)
        return (
        <p className="text-center text-muted-foreground">
            No hay roles registrados.
        </p>
        );

    return (
        <section
        className="grid gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
        >
        {roles.map((role) => (
            <details
            key={role.id}
            className="group rounded-lg border bg-card/80 backdrop-blur-md
                        shadow transition-shadow hover:shadow-md
                        open:ring-1 open:ring-accent"
            >
            <summary
                className="flex cursor-pointer items-center gap-3 list-none select-none
                        rounded-lg px-4 py-3"
            >
                <span className="rounded-full bg-secondary/90 px-2 py-0.5 text-xs
                                font-medium text-secondary-foreground">
                #{role.id}
                </span>

                <span className="flex-1 font-cap-heading-2 text-foreground">
                {role.nombre}
                </span>

                <ChevronDown
                className="h-4 w-4 text-muted-foreground transition-transform
                            group-open:rotate-180"
                />
            </summary>

            <div
                className="max-h-72 overflow-y-auto px-4 pb-5 pt-1
                        scrollbar-thin scrollbar-thumb-muted
                        group-open:animate-accordion-down"
            >
                <PermissionBadges permissions={role.permisos} />
            </div>
            </details>
        ))}
        </section>
    );
}

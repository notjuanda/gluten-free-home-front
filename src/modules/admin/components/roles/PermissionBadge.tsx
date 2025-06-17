const colorRing = [
    'bg-chart-1/15 text-chart-1 border-chart-1/20',
    'bg-chart-2/15 text-chart-2 border-chart-2/20',
    'bg-chart-3/15 text-chart-3 border-chart-3/20',
    'bg-chart-4/15 text-chart-4 border-chart-4/20',
    'bg-chart-5/15 text-chart-5 border-chart-5/20'
];
import type { PermissionBadgeProps } from '@/modules/admin/types/permission-badge.type';

export default function PermissionBadges({ permissions }: PermissionBadgeProps) {
    if (!permissions.length)
        return (
            <p className="text-sm text-muted-foreground">
                Este rol aún no tiene permisos asignados.
            </p>
        );

    return (
        <ul className="flex flex-wrap gap-2">
            {permissions.map((p, i) => (
                <li key={p.id}>
                    <span
                        className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium shadow-sm hover:brightness-110 transition ${colorRing[i % colorRing.length]}`}
                        title={p.descripcion ?? ''}
                    >
                        {p.clavePermiso}
                    </span>
                </li>
            ))}
        </ul>
    );
}

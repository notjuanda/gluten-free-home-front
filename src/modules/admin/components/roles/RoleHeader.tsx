import type { RoleHeaderProps } from "../../types/role-header.type"

export default function RoleHeader({ id, name }: RoleHeaderProps) {
    return (
        <h1 className="text-2xl font-cap-heading-2 text-foreground">
        Editar rol&nbsp;
        <span className="font-medium text-muted-foreground">#{id}</span>{' '}
        — {name}
        </h1>
    )
}

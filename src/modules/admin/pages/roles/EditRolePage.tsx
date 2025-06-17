import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Alert } from '@mui/material'

import { getRole } from '@/modules/core/api/roles.api'
import { useUpdateRole } from '@/modules/admin/hooks/roles/useUpdateRole'

import RoleHeader from '@/modules/admin/components/roles/RoleHeader'
import RoleForm from '@/modules/admin/components/roles/RoleForm'

import type { Role } from '@/modules/core/types/role.type'

export default function EditRolePage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [role, setRole] = useState<Role | null>(null)
    const [fetchError, setFetchError] = useState<string | null>(null)

    const { update, loading: updating, error: updateError } = useUpdateRole()

    useEffect(() => {
        if (!id) return
        getRole(+id)
            .then(setRole)
            .catch((e) => setFetchError(e.message))
    }, [id])

    const handleSubmit = async (values: any) => {
        if (!role) return
        const updated = await update(role.id, values)
        if (updated) navigate('/admin/permisos')
    }

    if (fetchError) return <Alert severity="error">{fetchError}</Alert>
    if (!role) return null

    return (
        <div className="mx-auto max-w-3x|l space-y-6 px-4 py-8">
            <RoleHeader id={role.id} name={role.nombre} />
            <RoleForm
                defaultValues={{ nombre: role.nombre, permisos: role.permisos }}
                loadingSubmit={updating}
                errorSubmit={updateError}
                onSubmit={handleSubmit}
                onCancel={() => navigate(-1)}
            />
        </div>
    )
}

import { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
} from '@mui/material'
import { Trash2 } from 'lucide-react'

import { ActionButton } from '@/shared/ui/ActionButton'
import { useDeleteRole } from '@/modules/admin/hooks/roles/useDeleteRole'
import type { deleteRoleProps } from '../../types/delete-role.type'

export default function DeleteRoleButton({ id, name, onDeleted }: deleteRoleProps) {
    const [open, setOpen] = useState(false)
    const { remove, loading, error } = useDeleteRole()

    const handleDelete = async () => {
        const ok = await remove(id)
        if (ok) {
        setOpen(false)
        onDeleted()
        }
    }

    return (
        <>
        <ActionButton
            variant="danger"
            className="p-2"
            iconLeft={<Trash2 size={14} />}
            onClick={() => setOpen(true)}
        >
            <span className="sr-only">Eliminar rol</span>
        </ActionButton>

        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Eliminar rol</DialogTitle>
            <DialogContent>
            ¿Seguro que deseas eliminar el rol “{name}”?
            {error && (
                <Alert severity="error" className="mt-4">
                {error}
                </Alert>
            )}
            </DialogContent>
            <DialogActions>
            <ActionButton variant="secondary" onClick={() => setOpen(false)}>
                Cancelar
            </ActionButton>
            <ActionButton
                variant="danger"
                loading={loading}
                onClick={handleDelete}
            >
                Eliminar
            </ActionButton>
            </DialogActions>
        </Dialog>
        </>
    )
}

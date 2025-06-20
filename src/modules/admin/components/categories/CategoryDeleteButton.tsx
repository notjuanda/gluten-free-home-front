import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
} from '@mui/material';
import { FiTrash2 } from 'react-icons/fi';
import { ActionButton } from '@/shared/ui/ActionButton';
import { useDeleteCategory } from '../../hooks/categories/useDeleteCategory';
import type { CategoryDeleteButtonProps } from '../../types/categories-components.type';

export default function CategoryDeleteButton({ id, name, onDeleted }: CategoryDeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const { deleteCategory, loading, error } = useDeleteCategory();

    const handleDelete = async () => {
        const ok = await deleteCategory(id);
        if (ok) {
            setOpen(false);
            onDeleted();
        }
    };

    return (
        <>
            <ActionButton
                variant="danger"
                className="p-2"
                iconLeft={<FiTrash2 size={16} />}
                onClick={() => setOpen(true)}
            >
                <span className="sr-only">Eliminar categoría</span>
            </ActionButton>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Eliminar categoría</DialogTitle>
                <DialogContent>
                    ¿Seguro que deseas eliminar la categoría “{name}”?
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
    );
} 
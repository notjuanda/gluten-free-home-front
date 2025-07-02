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
import { useDeleteIngredient } from '../../hooks/ingredients/useDeleteIngredient';
import type { IngredientDeleteButtonProps } from '../../types/ingredients-components-type';

export default function IngredientDeleteButton({ id, name, onDeleted }: IngredientDeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const { deleteIngredient, loading, error } = useDeleteIngredient();

    const handleDelete = async () => {
        const ok = await deleteIngredient(id);
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
                <span className="sr-only">Eliminar ingrediente</span>
            </ActionButton>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Eliminar ingrediente</DialogTitle>
                <DialogContent>
                    ¿Seguro que deseas eliminar el ingrediente “{name}”?
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
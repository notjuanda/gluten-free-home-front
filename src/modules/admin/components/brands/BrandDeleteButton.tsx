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
import { useDeleteBrand } from '../../hooks/brands/useDeleteBrand';
import type { BrandDeleteButtonProps } from '../../types/brands-components.type';

export default function BrandDeleteButton({ id, name, onDeleted }: BrandDeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const { deleteBrand, loading, error } = useDeleteBrand();

    const handleDelete = async () => {
        const ok = await deleteBrand(id);
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
                <span className="sr-only">Eliminar marca</span>
            </ActionButton>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Eliminar marca</DialogTitle>
                <DialogContent>
                    ¿Seguro que deseas eliminar la marca “{name}”?
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
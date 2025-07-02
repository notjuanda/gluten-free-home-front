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
import { useDeleteProduct } from '../../hooks/productos/useDeleteProduct';
import type { ProductDeleteButtonProps } from '../../types/products-components.type';

export default function ProductDeleteButton({ id, name, onDeleted }: ProductDeleteButtonProps) {
    const [open, setOpen] = useState(false);
    const { deleteProduct, loading, error } = useDeleteProduct();

    const handleDelete = async () => {
        const ok = await deleteProduct(id);
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
                <span className="sr-only">Eliminar producto</span>
            </ActionButton>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Eliminar producto</DialogTitle>
                <DialogContent>
                    ¿Seguro que deseas eliminar el producto “{name}”?
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
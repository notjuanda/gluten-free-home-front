import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Alert,
    IconButton,
} from '@mui/material';
import { useEffect } from 'react';
import type { FormModalProps, FormField } from '@/shared/types/form-modal.types';
import { ActionButton } from './ActionButton';
import { X } from 'lucide-react';

export function FormModal({
    open,
    title,
    fields,
    loading = false,
    error,
    fieldErrors,
    register,
    onClose,
    onSubmit,
    submitText = 'Guardar',
}: FormModalProps) {
    useEffect(() => {
        // Podés resetear cosas acá si lo necesitás
    }, [open]);

    const renderField = (field: FormField) => {
        const commonProps = {
            fullWidth: true,
            margin: 'normal' as const,
            required: field.required,
            label: field.label,
            placeholder: field.placeholder,
            error: Boolean(fieldErrors?.[field.name]),
            helperText: fieldErrors?.[field.name],
        };

        const registerProps = register ? register(field.name) : {};

        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
            case 'date':
                return (
                    <TextField
                        key={field.name}
                        type={field.type}
                        {...commonProps}
                        {...registerProps}
                        InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                    />
                );

            case 'textarea':
                return (
                    <TextField
                        key={field.name}
                        {...commonProps}
                        {...registerProps}
                        multiline
                        rows={4}
                    />
                );

            case 'select':
                return (
                    <TextField key={field.name} select {...commonProps} {...registerProps}>
                        {field.options?.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                );

            case 'image':
                return (
                    <div key={field.name} className="mt-4">
                        <label className="block text-sm font-medium text-muted-foreground mb-1">
                            {field.label}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...registerProps}
                            className="block w-full text-sm text-muted file:mr-4 file:py-2 file:px-4
                                file:rounded file:border-0 file:text-sm file:font-semibold
                                file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
                        />
                        {fieldErrors?.[field.name] && (
                            <p className="mt-1 text-sm text-red-500">
                                {fieldErrors[field.name]}
                            </p>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <div className="flex items-center justify-between pr-3 pt-2">
                <DialogTitle className="font-cap-heading-2">{title}</DialogTitle>
                <IconButton onClick={onClose} className="text-foreground">
                    <X size={20} />
                </IconButton>
            </div>

            <DialogContent dividers className="bg-card text-foreground">
                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}
                {fields.map(renderField)}
            </DialogContent>

            <DialogActions className="bg-muted px-4 py-3">
                <ActionButton
                    onClick={onSubmit}
                    loading={loading}
                    variant="neutral"
                >
                    {submitText}
                </ActionButton>
            </DialogActions>
        </Dialog>
    );
}

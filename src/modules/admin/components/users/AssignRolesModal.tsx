import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Checkbox,
    ListItemText,
    IconButton,
    Alert,
    Button,
    CircularProgress,
} from '@mui/material';
import { Controller }        from 'react-hook-form';
import { X }                 from 'lucide-react';

import { useAssignRolesForm } from '../../hooks/users/useAssignRolesForm';
import type { AssignRolesModalProps } from '../../types/users-components.type';

export default function AssignRolesModal({
    user,
    open,
    onClose,
    onUpdated,
}: AssignRolesModalProps) {
    const {
        roles,
        control,
        errors,
        error,
        busy,
        onSubmit,
    } = useAssignRolesForm(user, onUpdated, onClose);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <div className="flex items-center justify-between pr-3 pt-2">
            <DialogTitle className="font-cap-heading-2">
            Asignar roles — {user.nombreUsuario}
            </DialogTitle>
            <IconButton onClick={onClose} className="text-foreground" aria-label="Cerrar modal">
            <X size={18} />
            </IconButton>
        </div>

        <DialogContent dividers className="bg-card text-foreground">
            {error && (
            <Alert severity="error" className="mb-4">
                {error}
            </Alert>
            )}

            <Controller
            name="rolesIds"
            control={control}
            render={({ field }) => (
                <FormControl
                fullWidth
                margin="normal"
                required
                error={Boolean(errors.rolesIds)}
                >
                <InputLabel id="roles-label">Roles</InputLabel>

                <Select
                    {...field}
                    labelId="roles-label"
                    multiple
                    label="Roles"
                    renderValue={(selected) =>
                    (roles ?? [])
                        .filter((r) => (selected as number[]).includes(r.id))
                        .map((r) => r.nombre)
                        .join(', ')
                    }
                >
                    {(roles ?? []).map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                        <Checkbox checked={(field.value as number[]).includes(role.id)} />
                        <ListItemText primary={role.nombre} />
                    </MenuItem>
                    ))}
                </Select>

                <FormHelperText>{errors.rolesIds?.message}</FormHelperText>
                </FormControl>
            )}
            />
        </DialogContent>

        <DialogActions className="bg-muted px-4 py-3">
            <Button onClick={onClose} disabled={busy}>
            Cancelar
            </Button>
            <Button
            variant="contained"
            disabled={busy}
            onClick={onSubmit}
            startIcon={
                busy ? <CircularProgress size={16} thickness={5} color="inherit" /> : null
            }
            >
            Guardar
            </Button>
        </DialogActions>
        </Dialog>
    );
}

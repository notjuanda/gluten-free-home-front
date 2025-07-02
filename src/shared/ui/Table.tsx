import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import type { ReactNode } from 'react';

export interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => ReactNode;
    align?: 'left' | 'right' | 'center';
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: (item: T) => ReactNode;
    emptyMessage?: string;
}

export function CustomTable<T>({
    columns,
    data,
    actions,
    emptyMessage = 'No hay datos disponibles',
}: TableProps<T>) {
    return (
        <div className="w-full overflow-x-auto">
            <TableContainer
                component={Paper}
                className="rounded-lg shadow-md bg-card"
            >
                <Table
                    className="min-w-[640px]"
                    aria-label="custom table"
                >
                    <TableHead>
                        <TableRow className="bg-muted/40 text-muted-foreground">
                            {columns.map((col) => (
                                <TableCell
                                    key={col.key.toString()}
                                    align={col.align ?? 'left'}
                                    className="font-cap-heading-2 px-4 py-3 text-sm text-muted-foreground"
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                            {actions && (
                                <TableCell
                                    align="right"
                                    className="font-cap-heading-2 px-4 py-3 text-sm text-muted-foreground"
                                >
                                    Acciones
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.length > 0 ? (
                            data.map((row, idx) => (
                                <TableRow key={idx} hover className="transition hover:bg-muted/30">
                                    {columns.map((col) => (
                                        <TableCell
                                            key={col.key.toString()}
                                            align={col.align ?? 'left'}
                                            className="px-4 py-3 text-sm"
                                        >
                                            {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key as string])}
                                        </TableCell>
                                    ))}
                                    {actions && (
                                        <TableCell align="right" className="px-4 py-3">
                                            <Box display="flex" gap={1} justifyContent="flex-end">
                                                {actions(row)}
                                            </Box>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (actions ? 1 : 0)}
                                    className="px-4 py-6"
                                >
                                    <Typography
                                        align="center"
                                        color="text.secondary"
                                        className="text-muted-foreground text-sm"
                                    >
                                        {emptyMessage}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

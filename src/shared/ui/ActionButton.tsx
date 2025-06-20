import { Button, CircularProgress } from '@mui/material';
import type { MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'danger' | 'neutral';

interface ActionButtonProps {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    variant?: Variant;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
}

const variantStyles: Record<Variant, string> = {
    primary: 'bg-highlight text-black hover:bg-highlight/90',
    secondary: 'bg-muted text-foreground hover:bg-muted/70',
    danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    neutral: 'bg-button text-white hover:bg-button/90',
};

export function ActionButton({
    children,
    onClick,
    iconLeft,
    iconRight,
    variant = 'primary',
    className = '',
    disabled = false,
    loading = false,
    loadingText = 'Cargando...',
    }: ActionButtonProps) {
    return (
        <Button
        onClick={onClick}
        disabled={disabled || loading}
        className={clsx(
            'flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-cap-link transition-colors shadow-md',
            variantStyles[variant],
            className
        )}
        >
        {loading ? (
            <>
            <CircularProgress size={16} thickness={5} color="inherit" />
            <span>{loadingText}</span>
            </>
        ) : (
            <>
            {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
            {children && <span>{children}</span>}
            {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
            </>
        )}
        </Button>
    );
}

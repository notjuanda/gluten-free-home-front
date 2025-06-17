export const PaymentStatus = {
    PENDIENTE:   'pendiente',
    CONFIRMADO:  'confirmado',
    RECHAZADO:   'rechazado',
} as const;

export type PaymentStatus = typeof PaymentStatus[keyof typeof PaymentStatus];

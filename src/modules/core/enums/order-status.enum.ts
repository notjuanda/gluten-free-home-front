export const OrderStatus = {
    PENDIENTE: 'pendiente',
    PAGADO:    'pagado',
    ENVIADO:   'enviado',
    CANCELADO: 'cancelado',
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

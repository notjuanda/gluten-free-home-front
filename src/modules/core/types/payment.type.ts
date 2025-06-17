import type { Order } from './order.type';
import type { PaymentStatus } from '../enums/payment-status.enum';

export interface Payment {
    id: number;

    pedido?: Order;

    metodo: string;
    montoBob: number;
    montoUsd?: number;

    fechaPago: string;
    estado: PaymentStatus;

    createdAt: string;
    updatedAt: string;
}

export interface CreatePaymentInput {
    pedidoId: number;
    metodo: string;
    montoBob: number;
    montoUsd?: number;
    fechaPago: Date | string;
    estado?: PaymentStatus;
}

export type UpdatePaymentInput = Partial<CreatePaymentInput>;

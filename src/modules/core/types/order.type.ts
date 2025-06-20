import type { User } from '@/modules/admin/types/users.types';
import type { Address } from './address.type';
import type { OrderItem } from './order-item.type';
import type { Payment } from './payment.type';
import type { OrderStatus } from '../enums/order-status.enum';

export interface Order {
    id: number;

    usuario?: User;
    estado: OrderStatus;

    totalBob: number;
    totalUsd?: number;

    direccionEnvio?: Address | null;

    fechaPedido: string;

    items?: OrderItem[];
    pagos?: Payment[];

    createdAt: string;
    updatedAt: string;
}

export interface OrderItemInput {
    productoId: number;
    cantidad: number;
}

export interface CreateOrderInput {
    totalBob: number;
    totalUsd?: number;
    items: OrderItemInput[];
}

export type UpdateOrderInput = Partial<CreateOrderInput> & { estado?: OrderStatus };

export interface AssignAddressInput {
    direccionId: number;
}
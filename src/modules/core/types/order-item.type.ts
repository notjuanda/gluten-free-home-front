import type { Order } from './order.type';
import type { Product } from './product.type';

export interface OrderItem {
    id: number;

    pedido?: Order;

    producto?: Product;

    cantidad: number;
    precioUnitBob: number;
    precioUnitUsd?: number;

    createdAt: string;
    updatedAt: string;
}

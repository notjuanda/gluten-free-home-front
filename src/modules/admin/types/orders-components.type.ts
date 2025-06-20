import type { Order } from '@/modules/core/types/order.type';
import type { OrderItem } from '@/modules/core/types/order-item.type';
import type { OrderStatus } from '@/modules/core/enums/order-status.enum';

// Props para la lista de pedidos
export interface OrdersListProps {
    orders: Order[];
    loading: boolean;
    error: string | null;
    onOrderUpdated?: () => void;
}

// Props para el botón de cambiar estado
export interface ChangeOrderStatusButtonProps {
    orderId: number;
    currentStatus: OrderStatus;
    onStatusChanged?: () => void;
    className?: string;
}

// Props para el modal de detalles de pedido
export interface OrderDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: number | null;
}

// Props para el modal de cambiar estado
export interface ChangeStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: number | null;
    currentStatus: OrderStatus;
    onStatusChanged?: () => void;
}

// Props para la lista de items de pedido
export interface OrderItemsListProps {
    items: OrderItem[];
    loading: boolean;
    error: string | null;
}

// Props para el filtro de estados
export interface OrderStatusFilterProps {
    selectedStatus: OrderStatus | 'todos';
    onStatusChange: (status: OrderStatus | 'todos') => void;
}

// Props para el resumen de pedido
export interface OrderSummaryProps {
    order: Order;
    className?: string;
}

// Props para el botón de ver detalles
export interface ViewOrderDetailsButtonProps {
    orderId: number;
    className?: string;
} 
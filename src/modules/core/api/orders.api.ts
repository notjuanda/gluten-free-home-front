import api from './instance.api';
import type {
    Order,
    CreateOrderInput,
    UpdateOrderInput,
    AssignAddressInput,
} from '../types/order.type';
import type { Address } from '../types/address.type';
import type { OrderItem } from '../types/order-item.type';

export const getOrders = async (): Promise<Order[]> =>
    (await api.get<Order[]>('/orders')).data;

export const getOrder = async (id: number): Promise<Order> =>
    (await api.get<Order>(`/orders/${id}`)).data;

export const getOrderItems = async (id: number): Promise<OrderItem[]> =>
    (await api.get<OrderItem[]>(`/orders/${id}/items`)).data;

export const getOrderAddress = async (id: number): Promise<Address | null> =>
    (await api.get<Address | null>(`/orders/${id}/direccion-envio`)).data;

export const createOrder = async (
    payload: CreateOrderInput,
): Promise<Order> =>
    (await api.post<Order>('/orders', payload)).data;

export const updateOrder = async (
    id: number,
    payload: UpdateOrderInput,
): Promise<Order> => {
    console.log('Enviando actualización de orden:', { id, payload });
    return (await api.patch<Order>(`/orders/${id}`, payload)).data;
};

export const updateOrderStatus = async (
    id: number,
    estado: string,
): Promise<Order> => {
    console.log('Enviando actualización de estado:', { id, estado });
    // Usar el endpoint general con solo el estado
    return (await api.patch<Order>(`/orders/${id}`, { estado })).data;
};

export const deleteOrder = async (id: number): Promise<void> => {
    await api.delete(`/orders/${id}`);
};

export const assignAddressToOrder = async (
    id: number,
    payload: AssignAddressInput,
): Promise<Order> =>
    (await api.patch<Order>(`/orders/${id}/direccion-envio`, payload)).data;

export const getMyOrders = async (): Promise<Order[]> =>
    (await api.get<Order[]>('/orders/me/orders')).data;

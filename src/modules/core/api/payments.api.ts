import api from './instance.api';
import type {
    Payment,
    CreatePaymentInput,
    UpdatePaymentInput,
} from '../types/payment.type';

export const getPayments = async (): Promise<Payment[]> =>
    (await api.get<Payment[]>('/payments')).data;

export const getPayment = async (id: number): Promise<Payment> =>
    (await api.get<Payment>(`/payments/${id}`)).data;

export const createPayment = async (
    payload: CreatePaymentInput,
): Promise<Payment> =>
    (await api.post<Payment>('/payments', payload)).data;

export const updatePayment = async (
    id: number,
    payload: UpdatePaymentInput,
): Promise<Payment> =>
    (await api.patch<Payment>(`/payments/${id}`, payload)).data;

export const deletePayment = async (id: number): Promise<void> => {
    await api.delete(`/payments/${id}`);
};

export const confirmPayment = async (id: number): Promise<Payment> =>
    (await api.patch<Payment>(`/payments/${id}/confirmar`)).data;

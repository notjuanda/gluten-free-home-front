import type { Payment } from '@/modules/core/types/payment.type';
import type { PaymentStatus } from '@/modules/core/enums/payment-status.enum';

// Props para la lista de pagos
export interface PaymentsListProps {
    payments: Payment[];
    loading: boolean;
    error: string | null;
    onPaymentUpdated?: () => void;
}

// Props para el botón de confirmar pago
export interface ConfirmPaymentButtonProps {
    paymentId: number;
    currentStatus: PaymentStatus;
    onPaymentConfirmed?: () => void;
    className?: string;
}

// Props para el botón de rechazar pago
export interface RejectPaymentButtonProps {
    paymentId: number;
    currentStatus: PaymentStatus;
    onPaymentRejected?: () => void;
    className?: string;
}

// Props para el modal de detalles de pago
export interface PaymentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    paymentId: number | null;
}

// Props para el modal de confirmar pago
export interface ConfirmPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    paymentId: number | null;
    onPaymentConfirmed?: () => void;
}

// Props para el modal de rechazar pago
export interface RejectPaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    paymentId: number | null;
    onPaymentRejected?: () => void;
}

// Props para el filtro de estados
export interface PaymentStatusFilterProps {
    selectedStatus: PaymentStatus | 'todos';
    onStatusChange: (status: PaymentStatus | 'todos') => void;
}

// Props para el resumen de pago
export interface PaymentSummaryProps {
    payment: Payment;
    className?: string;
}

// Props para el botón de ver detalles
export interface ViewPaymentDetailsButtonProps {
    paymentId: number;
    className?: string;
} 
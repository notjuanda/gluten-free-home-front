import { useState } from 'react';
import { FiCreditCard } from 'react-icons/fi';
import PaymentsList from '../../components/payments/PaymentsList';
import { usePayments } from '../../hooks/payments/usePayments';

export default function PaymentsPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { data: payments, isLoading, error } = usePayments({ refreshTrigger });

    const handlePaymentUpdated = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <FiCreditCard className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">Gestión de Pagos</h1>
                                <p className="text-muted-foreground">Administra y confirma los pagos de la tienda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-card border border-border rounded-lg shadow-sm">
                    <PaymentsList
                        payments={payments || []}
                        loading={isLoading}
                        error={error?.message || null}
                        onPaymentUpdated={handlePaymentUpdated}
                    />
                </div>
            </div>
        </div>
    );
} 
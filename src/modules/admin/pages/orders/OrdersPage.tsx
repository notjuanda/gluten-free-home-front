import { useState } from 'react';
import { FiPackage } from 'react-icons/fi';
import OrdersList from '../../components/orders/OrdersList';
import { useOrders } from '../../hooks/orders/useOrders';

export default function OrdersPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { data: orders, isLoading, error } = useOrders({ refreshTrigger });

    const handleOrderUpdated = () => {
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
                                <FiPackage className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">Gestión de Pedidos</h1>
                                <p className="text-muted-foreground">Administra todos los pedidos de la tienda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-6">
                <div className="bg-card border border-border rounded-lg shadow-sm">
                    <OrdersList 
                        orders={orders || []}
                        loading={isLoading}
                        error={error?.message || null}
                        onOrderUpdated={handleOrderUpdated}
                    />
                </div>
            </div>
        </div>
    );
} 
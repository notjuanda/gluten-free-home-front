import React from 'react';
import { useMyOrders } from '../hooks/useMyOrders';
import { Loader2, Receipt, CreditCard, ChevronDown, ChevronUp, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const statusColors: Record<string, string> = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    pagado: 'bg-blue-100 text-blue-800',
    enviado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800',
};

const statusIcons: Record<string, React.ReactNode> = {
    pendiente: <Package className="h-4 w-4 mr-1 text-yellow-500" />,
    pagado: <CheckCircle className="h-4 w-4 mr-1 text-blue-500" />,
    enviado: <Truck className="h-4 w-4 mr-1 text-green-500" />,
    cancelado: <XCircle className="h-4 w-4 mr-1 text-red-500" />,
};

const getStatusDisplay = (status: string): string => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
        case 'pendiente':
            return 'Pendiente de pago';
        case 'pagado':
            return 'Pagado - Pendiente de envío';
        case 'enviado':
            return 'Enviado - En camino';
        case 'cancelado':
            return 'Cancelado';
        default:
            return status;
    }
};

const MyOrdersList = () => {
    const { data: orders, isLoading, error } = useMyOrders();
    const [openOrder, setOpenOrder] = useState<number | null>(null);

    if (isLoading) return (
        <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Cargando pedidos...</span>
        </div>
    );

    if (error) return (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
            Error al cargar tus pedidos: {error.message}
        </div>
    );

    if (!orders || orders.length === 0) return (
        <div className="text-center text-muted-foreground py-12">
            No tienes pedidos registrados.
        </div>
    );

    return (
        <div className="space-y-6">
            {orders.map(order => {
                const isOpen = openOrder === order.id;
                const status = order.estado?.toLowerCase() || 'pendiente';
                const statusDisplay = getStatusDisplay(order.estado || 'pendiente');
                return (
                    <div key={order.id} className="border rounded-2xl p-0 bg-card shadow-sm overflow-hidden transition-all">
                        <div className="flex items-center px-6 py-4 gap-3 cursor-pointer group hover:bg-muted/40 transition" onClick={() => setOpenOrder(isOpen ? null : order.id)}>
                            <Receipt className="h-6 w-6 text-primary" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-lg">Pedido #{order.id}</span>
                                    <span className={clsx('px-2 py-0.5 rounded-full text-xs font-bold flex items-center', statusColors[status])}>
                                        {statusIcons[status]} {statusDisplay}
                                    </span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {new Date(order.createdAt).toLocaleString()}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-base font-bold text-foreground">Bs {Number(order.totalBob || 0).toFixed(2)}</span>
                                <span className="text-xs text-muted-foreground">{order.items?.length || 0} productos</span>
                            </div>
                            <button className="ml-2 p-1 rounded hover:bg-muted transition-colors">
                                {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                            </button>
                        </div>
                        {isOpen && (
                            <div className="bg-muted/10 px-6 pb-5 pt-2 animate-fade-in">
                                <div className="mb-3">
                                    <span className="font-medium">Dirección de envío:</span>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        {order.direccionEnvio?.linea1} {order.direccionEnvio?.linea2 && `- ${order.direccionEnvio.linea2}`}<br />
                                        {order.direccionEnvio?.ciudad}, {order.direccionEnvio?.departamento}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <span className="font-medium">Productos:</span>
                                    <ul className="list-disc ml-6 mt-1">
                                        {order.items?.map(item => (
                                            <li key={item.id} className="flex items-center gap-2 text-sm py-0.5">
                                                <span className="font-semibold">{item.producto?.nombre}</span>
                                                <span className="text-xs text-muted-foreground">x{item.cantidad}</span>
                                                <span className="ml-auto">Bs {Number(item.precioUnitBob * item.cantidad).toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mb-3 flex flex-col gap-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Envío:</span>
                                        <span>Bs {Number(order.costoEnvioBob || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <span>Total:</span>
                                        <span>Bs {Number(order.totalBob || 0).toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <span className="font-medium">Pagos:</span>
                                    <ul className="list-disc ml-6 mt-1">
                                        {order.pagos?.length
                                            ? order.pagos.map(pago => (
                                                <li key={pago.id} className="flex items-center gap-2 text-sm py-0.5">
                                                    <CreditCard className="h-4 w-4 text-blue-500" />
                                                    <span>{pago.metodo}</span>
                                                    <span className={clsx('px-2 py-0.5 rounded-full text-xs font-bold',
                                                        pago.estado === 'confirmado' ? 'bg-green-100 text-green-800' :
                                                        pago.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800')}>{pago.estado}</span>
                                                    <span>Bs {Number(pago.montoBob || 0).toFixed(2)}</span>
                                                    <span className="text-xs text-muted-foreground ml-2">{new Date(pago.fechaPago).toLocaleString()}</span>
                                                </li>
                                            ))
                                            : <span className="text-xs text-muted-foreground">Sin pagos registrados</span>
                                        }
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MyOrdersList; 
import { useState } from 'react';
import { FiPackage, FiCalendar, FiUser, FiDollarSign } from 'react-icons/fi';
import type { OrdersListProps } from '../../types/orders-components.type';
import type { OrderStatus } from '../../../core/enums/order-status.enum';
import ViewOrderDetailsButton from './ViewOrderDetailsButton';
import ChangeOrderStatusButton from './ChangeOrderStatusButton';

export default function OrdersList({ orders, loading, error, onOrderUpdated }: OrdersListProps) {
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'todos'>('todos');

    const handleStatusChange = (status: OrderStatus | 'todos') => {
        setSelectedStatus(status);
    };

    const filteredOrders = selectedStatus === 'todos' 
        ? orders 
        : orders.filter(order => order.estado === selectedStatus);

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'pendiente': return 'text-yellow-600 bg-yellow-100';
            case 'pagado': return 'text-blue-600 bg-blue-100';
            case 'enviado': return 'text-purple-600 bg-purple-100';
            case 'cancelado': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusText = (status: OrderStatus) => {
        switch (status) {
            case 'pendiente': return 'Pendiente';
            case 'pagado': return 'Pagado';
            case 'enviado': return 'Enviado';
            case 'cancelado': return 'Cancelado';
            default: return status;
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center py-16 animate-fade-in">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <span className="text-muted-foreground text-lg font-medium">Cargando pedidos...</span>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-red-500">
            <FiPackage className="h-10 w-10 mb-2" />
            <span className="font-semibold">{error}</span>
        </div>
    );

    if (!orders.length) return (
        <div className="flex flex-col items-center py-16 animate-fade-in text-muted-foreground">
            <FiPackage className="h-10 w-10 mb-2" />
            <span className="font-semibold">No hay pedidos registrados.</span>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Filtro de estados */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => handleStatusChange('todos')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'todos'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Todos ({orders.length})
                </button>
                <button
                    onClick={() => handleStatusChange('pendiente')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'pendiente'
                            ? 'bg-yellow-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Pendientes ({orders.filter(o => o.estado === 'pendiente').length})
                </button>
                <button
                    onClick={() => handleStatusChange('pagado')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'pagado'
                            ? 'bg-blue-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Pagados ({orders.filter(o => o.estado === 'pagado').length})
                </button>
                <button
                    onClick={() => handleStatusChange('enviado')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'enviado'
                            ? 'bg-purple-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Enviados ({orders.filter(o => o.estado === 'enviado').length})
                </button>
                <button
                    onClick={() => handleStatusChange('cancelado')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedStatus === 'cancelado'
                            ? 'bg-red-500 text-white'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                    Cancelados ({orders.filter(o => o.estado === 'cancelado').length})
                </button>
            </div>

            {/* Lista de pedidos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                {filteredOrders.map((order) => (
                    <div
                        key={order.id}
                        className="relative group border border-primary/10 rounded-2xl shadow-xl p-6 flex flex-col gap-3 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <ViewOrderDetailsButton orderId={order.id} />
                            <ChangeOrderStatusButton 
                                orderId={order.id} 
                                currentStatus={order.estado}
                                onStatusChanged={onOrderUpdated}
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full mb-2">
                            <div className="rounded-full p-2 border border-primary/20">
                                <FiPackage className="h-7 w-7 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-extrabold text-lg text-foreground tracking-tight">
                                    Pedido #{order.id}
                                </div>
                                <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getStatusColor(order.estado)}`}>
                                    {getStatusText(order.estado)}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <FiUser className="w-4 h-4" />
                                <span>{order.usuario?.correo || 'Cliente no disponible'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <FiCalendar className="w-4 h-4" />
                                <span>{new Date(order.fechaPedido).toLocaleDateString('es-ES')}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center text-sm">
                            <div className="flex items-center gap-1 font-semibold text-primary">
                                <FiDollarSign className="w-4 h-4" />
                                <span>{order.totalBob} BOB</span>
                            </div>
                            {order.totalUsd && (
                                <span className="text-muted-foreground">/ {order.totalUsd} USD</span>
                            )}
                            {order.items && order.items.length > 0 && (
                                <span className="ml-auto text-muted-foreground">
                                    {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                                </span>
                            )}
                        </div>

                        {order.direccionEnvio && (
                            <div className="text-xs text-muted-foreground mt-2">
                                <span className="font-medium">Envío:</span> {order.direccionEnvio.ciudad}, {order.direccionEnvio.departamento}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {filteredOrders.length === 0 && orders.length > 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <FiPackage className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay pedidos con el estado seleccionado.</p>
                </div>
            )}
        </div>
    );
} 
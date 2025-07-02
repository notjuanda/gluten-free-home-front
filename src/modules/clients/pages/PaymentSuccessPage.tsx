import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';

const PaymentSuccessPage = () => {
    const [searchParams] = useSearchParams();
    const [_orderId, _setOrderId] = useState<string>('');

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (sessionId) {
            // Aquí podrías hacer una llamada al backend para obtener los detalles del pedido
            // basado en el session_id
            console.log('Session ID:', sessionId);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    ¡Pago Exitoso!
                </h1>
                
                <p className="text-gray-600 mb-6">
                    Tu pago ha sido procesado correctamente. Recibirás un email de confirmación con los detalles de tu compra.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-center mb-2">
                        <Package className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="font-medium">Número de Sesión</span>
                    </div>
                    <p className="text-sm text-gray-600">
                        {searchParams.get('session_id') || 'N/A'}
                    </p>
                </div>
                
                <div className="space-y-3">
                    <Link
                        to="/explorar"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Seguir Comprando
                    </Link>
                    
                    <Link
                        to="/"
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        Ir al Inicio
                    </Link>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        ¿Tienes alguna pregunta? Contáctanos en{' '}
                        <a href="mailto:soporte@glutenfreehome.com" className="text-blue-600 hover:underline">
                            soporte@glutenfreehome.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage; 
import { Link } from 'react-router-dom';
import { XCircle, Home, ShoppingBag, ArrowLeft } from 'lucide-react';

const PaymentCancelPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="mb-6">
                    <XCircle className="mx-auto h-16 w-16 text-red-500" />
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Pago Cancelado
                </h1>
                
                <p className="text-gray-600 mb-6">
                    El proceso de pago ha sido cancelado. No se ha realizado ningún cargo a tu cuenta.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                        Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
                    </p>
                </div>
                
                <div className="space-y-3">
                    <Link
                        to="/carrito"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver al Carrito
                    </Link>
                    
                    <Link
                        to="/explorar"
                        className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
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
                        ¿Necesitas ayuda? Contáctanos en{' '}
                        <a href="mailto:soporte@glutenfreehome.com" className="text-blue-600 hover:underline">
                            soporte@glutenfreehome.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelPage; 
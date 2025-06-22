import { useCart } from '../hooks/useCart';
import { FiTrash2 } from 'react-icons/fi';

const CartPage = () => {
    const { cart, removeFromCart, addToCart, clearCart } = useCart();

    const handleDecrease = (productId: number) => {
        const item = cart.find(i => i.product.id === productId);
        if (item && item.quantity > 1) {
        addToCart(item.product, -1);
        } else {
        removeFromCart(productId);
        }
    };

    const total = cart.reduce(
    (sum, item) => sum + Number(item.product.precioBob) * item.quantity,
    0
    );


    return (
        <div className="min-h-screen bg-background text-foreground p-8">
        <h1 className="text-3xl font-bold mb-6">Mi carrito</h1>

        {cart.length === 0 ? (
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
        ) : (
            <>
            <div className="grid gap-6 mb-6">
                {cart.map(item => (
                <div
                    key={item.product.id}
                    className="flex items-center gap-4 bg-client p-4 rounded-lg shadow-sm"
                >
                    <img
                    src={
                        item.product.imagenes?.[0]?.urlImagen ??
                        '/logo-gluten-free-home.png'
                    }
                    alt={item.product.nombre}
                    className="w-20 h-20 object-contain rounded"
                    />
                    <div className="flex-1">
                    <p className="font-semibold">{item.product.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                        Bs {item.product.precioBob.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <button
                        className="px-2 py-1 border rounded text-sm"
                        onClick={() => handleDecrease(item.product.id)}
                        >
                        -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                        className="px-2 py-1 border rounded text-sm"
                        onClick={() => addToCart(item.product)}
                        >
                        +
                        </button>
                    </div>
                    </div>
                    <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700"
                    >
                    <FiTrash2 size={18} />
                    </button>
                </div>
                ))}
            </div>

            <div className="bg-client border-border rounded-lg p-6 shadow-md">
                <div className="flex justify-between text-lg font-bold mb-4">
                <span>Total:</span>
                <span>Bs {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                <button
                    onClick={clearCart}
                    className="bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200 text-sm"
                >
                    Vaciar carrito
                </button>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded hover:opacity-90 transition">
                    Proceder al pago
                </button>
                </div>
            </div>
            </>
        )}
        </div>
    );
};

export default CartPage;

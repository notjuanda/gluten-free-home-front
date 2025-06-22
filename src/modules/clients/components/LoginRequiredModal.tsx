import { useNavigate } from 'react-router-dom';

interface Props {
    visible: boolean;
    onClose: () => void;
}

const LoginRequiredModal: React.FC<Props> = ({ visible, onClose }) => {
    const navigate = useNavigate();

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-80">
            <h2 className="text-lg font-semibold mb-4 text-center">
            Debes iniciar sesión
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
            Para agregar productos al carrito necesitas estar autenticado.
            </p>
            <div className="flex justify-between">
            <button
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                onClick={onClose}
            >
                Cancelar
            </button>
            <button
                className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary/90"
                onClick={() => navigate('/login')}
            >
                Iniciar sesión
            </button>
            </div>
        </div>
        </div>
    );
};

export default LoginRequiredModal;

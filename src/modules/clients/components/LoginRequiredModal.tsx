import { useNavigate } from 'react-router-dom';
import type { LoginRequiredModalProps } from '../types/products-components.type';

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({ visible, onClose }) => {
    const navigate = useNavigate();

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-3 sm:p-4">
            <div className="bg-card border border-border rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm mx-4">
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center text-foreground">
                    Debes iniciar sesión
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 text-center">
                    Para agregar productos al carrito necesitas estar autenticado.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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

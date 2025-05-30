import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    // 👇🏽  Necesario para que el navegador envíe la cookie `authToken`
    withCredentials: true,
});

// ──────────────────────── Interceptores ────────────────────────
apiInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        let userMessage = 'Ha ocurrido un problema. Inténtalo de nuevo.';

        if (error.response) {
            switch (error.response.status) {
                case 400:
                    userMessage = 'Parece que hay un error en la información enviada.';
                    break;
                case 401:
                    userMessage = 'No estás autorizado. Inicia sesión nuevamente.';
                    break;
                case 403:
                    userMessage = 'No tienes permisos para realizar esta acción.';
                    break;
                case 404:
                    userMessage = 'Recurso no encontrado.';
                    break;
                case 409:
                    userMessage = 'Conflicto en la petición — quizá el recurso ya existe.';
                    break;
                case 500:
                    userMessage = 'Error interno del servidor. Inténtalo más tarde.';
                    break;
                default:
                    userMessage = 'Algo salió mal. Inténtalo nuevamente.';
                    break;
            }
        } else if (error.request) {
            userMessage = 'Sin respuesta del servidor. Verifica tu conexión.';
        }

        return Promise.reject(new Error(userMessage));
    },
);

export default apiInstance;

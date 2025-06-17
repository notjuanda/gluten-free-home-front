import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

api.interceptors.response.use(
    res => res,
    (error: AxiosError) => {
        let friendly = 'Ha ocurrido un problema. Inténtalo de nuevo.';

        if (error.response) {
        switch (error.response.status) {
            case 400: friendly = 'Parece que hay un error en la información enviada.'; break;
            case 401: friendly = 'No estás autorizado. Inicia sesión nuevamente.';      break;
            case 403: friendly = 'No tienes permisos para realizar esta acción.';       break;
            case 404: friendly = 'Recurso no encontrado.';                              break;
            case 409: friendly = 'Conflicto en la petición — quizá el recurso ya existe.'; break;
            case 500: friendly = 'Error interno del servidor. Inténtalo más tarde.';    break;
            default:  friendly = 'Algo salió mal. Inténtalo nuevamente.';               break;
        }
        } else if (error.request) {
        friendly = 'Sin respuesta del servidor. Verifica tu conexión.';
        }

        error.message = friendly;

        return Promise.reject(error);
    }
);

export default api;

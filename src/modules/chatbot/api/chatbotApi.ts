import axios from 'axios';

const CHATBOT_API_BASE_URL = import.meta.env.VITE_CHATBOT_API_BASE_URL || 'http://localhost:3001';

const chatbotApiInstance = axios.create({
    baseURL: CHATBOT_API_BASE_URL,
    withCredentials: true,
});

export interface ChatMessage {
    message: string;
    userId?: number;
}

export interface ChatResponse {
    response: string;
    productos?: any[];
    remainingRequests?: number;
}

export const chatbotApi = {
    // Enviar mensaje al chatbot (para usuarios autenticados y no autenticados)
    sendMessage: async (message: string): Promise<ChatResponse> => {
        const { data } = await chatbotApiInstance.post<ChatResponse>('/chat', { message });
        return data;
    },

    // Enviar mensaje al chatbot (solo para usuarios autenticados)
    sendAuthenticatedMessage: async (message: string): Promise<ChatResponse> => {
        const { data } = await chatbotApiInstance.post<ChatResponse>('/chat/authenticated', { message });
        return data;
    },

    // Limpiar sesión del chatbot (solo para usuarios autenticados)
    clearSession: async (): Promise<{ message: string }> => {
        const { data } = await chatbotApiInstance.delete<{ message: string }>('/chat/session');
        return data;
    },
}; 
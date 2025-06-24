import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { ChatbotContext, type ChatMessage } from '../context/ChatbotContext';
import { chatbotApi } from '../api/chatbotApi';
import { useAuth } from '@/modules/core/hooks/useAuth';

interface Props {
    children: ReactNode;
}

export const ChatbotProvider = ({ children }: Props) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [remainingRequests, setRemainingRequests] = useState<number | undefined>();
    const [error, setError] = useState<string | undefined>();
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [sessionKey, setSessionKey] = useState<string>('');
    
    const { user } = useAuth();

    // Generar una clave de sesión única para cada sesión del navegador
    useEffect(() => {
        if (!sessionKey) {
            setSessionKey(`${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
        }
    }, [sessionKey]);

    // Limpiar el chat cuando cambie el usuario
    useEffect(() => {
        const userId = user?.id?.toString() || 'anonymous';
        
        if (currentUserId !== userId) {
            // Limpiar sesión en el backend si el usuario anterior estaba autenticado
            if (currentUserId && currentUserId !== 'anonymous' && user) {
                chatbotApi.clearSession().catch(console.error);
            }
            
            // Usuario cambió, limpiar todo el estado
            setMessages([]);
            setError(undefined);
            setRemainingRequests(undefined);
            setIsOpen(false);
            setCurrentUserId(userId);
        }
    }, [user?.id, currentUserId]);

    // Limpiar el chat cuando se cierre sesión
    useEffect(() => {
        if (!user && currentUserId !== 'anonymous') {
            // Limpiar sesión en el backend
            if (currentUserId && currentUserId !== 'anonymous') {
                chatbotApi.clearSession().catch(console.error);
            }
            
            setMessages([]);
            setError(undefined);
            setRemainingRequests(undefined);
            setIsOpen(false);
            setCurrentUserId('anonymous');
        }
    }, [user, currentUserId]);

    // Limpiar el chat cuando se recarga la página (nueva sesión)
    useEffect(() => {
        const handleBeforeUnload = () => {
            setMessages([]);
            setError(undefined);
            setRemainingRequests(undefined);
            setIsOpen(false);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return { productos: [] };

        const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content: content.trim(),
        role: 'user',
        timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(undefined);

        try {
        // El token se maneja automáticamente con cookies
        const response = await chatbotApi.sendMessage(content);
        
        const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: response.response,
            role: 'assistant',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setRemainingRequests(response.remainingRequests);
        
        return { productos: response.productos || [] };
        } catch (err: any) {
        console.error('Error enviando mensaje al chatbot:', err);
        
        const errorMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: err.response?.data?.message || 'Lo siento, hubo un error al procesar tu mensaje. Inténtalo de nuevo.',
            role: 'assistant',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, errorMessage]);
        setError(err.response?.data?.message || 'Error de conexión');
        
        return { productos: [] };
        } finally {
        setIsLoading(false);
        }
    }, []);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => !prev);
        if (!isOpen) {
        setError(undefined);
        }
    }, [isOpen]);

    const clearChat = useCallback(() => {
        setMessages([]);
        setError(undefined);
        setRemainingRequests(undefined);
    }, []);

    const value = {
        messages,
        isOpen,
        isLoading,
        remainingRequests,
        error,
        sendMessage,
        toggleChat,
        clearChat,
    };

    return (
        <ChatbotContext.Provider value={value}>
        {children}
        </ChatbotContext.Provider>
    );
}; 
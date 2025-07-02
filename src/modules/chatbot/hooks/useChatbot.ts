import { useContext } from 'react';
import { ChatbotContext } from '../context/ChatbotContext';

export const useChatbot = () => {
    const context = useContext(ChatbotContext);
    
    if (!context) {
        throw new Error('useChatbot debe ser usado dentro de un ChatbotProvider');
    }
    
    return context;
}; 
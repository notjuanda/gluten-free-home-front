export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export interface ChatbotState {
    messages: ChatMessage[];
    isOpen: boolean;
    isLoading: boolean;
    remainingRequests?: number;
    error?: string;
}

export interface ChatbotContextType extends ChatbotState {
    sendMessage: (message: string) => Promise<{ productos?: any[] }>;
    toggleChat: () => void;
    clearChat: () => void;
} 
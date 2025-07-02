import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, User, AlertCircle, ShoppingBag, X as CloseIcon } from 'lucide-react';
import { useChatbot } from '../hooks/useChatbot';
import { useAuth } from '@/modules/core/hooks/useAuth';
import { ChatbotProductCard } from './ChatbotProductCard';
import clsx from 'clsx';
import { CollapsibleMessage } from './CollapsibleMessage';

export const ChatbotWidget = () => {
    const { messages, isOpen, isLoading, remainingRequests, error, sendMessage, toggleChat, clearChat } = useChatbot();
    const { user } = useAuth();
    const location = useLocation();
    const [inputValue, setInputValue] = useState('');
    const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
    const [showProducts, setShowProducts] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
        inputRef.current?.focus();
        }
    }, [isOpen]);

    // Cerrar chat en rutas admin
    useEffect(() => {
        if (location.pathname.includes('/admin') && isOpen) {
            toggleChat();
        }
    }, [location.pathname, isOpen, toggleChat]);

    // Auto-hide productos recomendados después de 30 segundos
    useEffect(() => {
        if (recommendedProducts.length > 0 && showProducts) {
        const timer = setTimeout(() => {
            setShowProducts(false);
        }, 30000); // 30 segundos

        return () => clearTimeout(timer);
        }
    }, [recommendedProducts, showProducts]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const message = inputValue;
        setInputValue('');
        const response = await sendMessage(message);
        
        // Si el backend envía productos recomendados, mostrarlos
        if (response?.productos && response.productos.length > 0) {
        setRecommendedProducts(response.productos);
        setShowProducts(true);
        } else {
        // Si no hay productos, ocultar los anteriores
        setShowProducts(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
        }
    };

    const handleClearChat = () => {
        clearChat();
        setRecommendedProducts([]);
        setShowProducts(false);
    };

    // No mostrar el chatbot en rutas admin
    if (location.pathname.includes('/admin')) {
        return null;
    }

    return (
        <>
        {/* Botón flotante */}
        <button
            onClick={toggleChat}
            className={clsx(
            'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl',
            isOpen && 'scale-90 opacity-0'
            )}
            aria-label="Abrir chat"
        >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>

        {/* Ventana del chat */}
        <div
            className={clsx(
            'fixed bottom-6 right-6 z-40 h-[500px] w-[380px] rounded-lg bg-background shadow-2xl transition-all duration-300',
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-primary text-primary-foreground p-4 rounded-t-lg">
            <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-semibold">Lulupico - Asistente Virtual</h3>
            </div>
            <div className="flex items-center gap-2">
                {remainingRequests !== undefined && !user && (
                <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded">
                    {remainingRequests} mensajes restantes
                </span>
                )}
                <button
                onClick={toggleChat}
                className="hover:bg-primary-foreground/20 p-1 rounded transition-colors"
                >
                <X size={18} />
                </button>
            </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[380px]">
            {messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                <Bot size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm">
                    ¡Hola! Soy Lulupico, tu asistente virtual de Gluten Free Home. 
                    ¿En qué puedo ayudarte hoy?
                </p>
                {!user && (
                    <p className="text-xs mt-2 text-muted-foreground">
                    Inicia sesión para mensajes ilimitados
                    </p>
                )}
                </div>
            ) : (
                messages.map((message) => (
                <div
                    key={message.id}
                    className={clsx(
                    'flex gap-3',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                >
                    {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot size={16} className="text-primary-foreground" />
                    </div>
                    )}
                    
                    <div
                    className={clsx(
                        'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                        message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted',
                        'break-words'
                    )}
                    >
                    {message.role === 'assistant' ? (
                        <CollapsibleMessage text={message.content} />
                    ) : (
                        message.content
                    )}
                    </div>

                    {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <User size={16} />
                    </div>
                    )}
                </div>
                ))
            )}

            {/* Productos recomendados - Solo mostrar si hay productos y showProducts es true */}
            {recommendedProducts.length > 0 && showProducts && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <ShoppingBag size={16} className="text-green-600" />
                    <p className="text-xs font-semibold text-green-700">Productos recomendados</p>
                    </div>
                    <button
                    onClick={() => setShowProducts(false)}
                    className="text-green-600 hover:text-green-800 transition-colors"
                    >
                    <CloseIcon size={14} />
                    </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                    {recommendedProducts.map((product) => (
                    <ChatbotProductCard key={product.id} product={product} />
                    ))}
                </div>
                <p className="text-xs text-green-600 text-center">
                    Se ocultarán automáticamente en 30 segundos
                </p>
                </div>
            )}

            {isLoading && (
                <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
                </div>
            )}

            {error && (
                <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                    <AlertCircle size={16} className="text-destructive-foreground" />
                </div>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 text-sm text-destructive">
                    {error}
                </div>
                </div>
            )}

            <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t p-4">
            <div className="flex gap-2">
                <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                disabled={isLoading}
                />
                <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="rounded-md bg-primary p-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                <Send size={16} />
                </button>
            </div>
            
            {messages.length > 0 && (
                <button
                type="button"
                onClick={handleClearChat}
                className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                Limpiar conversación
                </button>
            )}
            </form>
        </div>
        </>
    );
}; 
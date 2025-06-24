import {RouterProvider} from "react-router-dom";
import router from "./modules/core/router/Router.tsx";
import { AuthProvider } from "./modules/core/providers/AuthProvider.tsx";
import { CartProvider } from "./modules/clients/context/CartContext.tsx";
import { ChatbotProvider } from "./modules/chatbot/providers/ChatbotProvider.tsx";
import { ErrorBoundary } from "./modules/core/components/ErrorBoundary.tsx";

const App = ()=>{
    return (
        <ErrorBoundary>
            <AuthProvider>
                <CartProvider>
                    <ChatbotProvider>
                        <RouterProvider router={router}/>
                    </ChatbotProvider>
                </CartProvider>
            </AuthProvider>
        </ErrorBoundary>
    )
}
export default App;
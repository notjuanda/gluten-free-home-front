import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import AdminSidebar from "../components/AdminSidebar";
import { ChatbotWidget } from "@/modules/chatbot/components/ChatbotWidget";
import { useAuth } from "../hooks/useAuth";
import type { PageLayoutProps } from "../types/page-layout.type";

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isAdmin = user?.roles?.some((r: { nombre: string }) => r.nombre.trim().toLowerCase() === 'admin');

    if (isAdminRoute && isAdmin) {
        return (
            <div className="overflow-x-hidden min-h-screen">
                <AdminSidebar user={user || undefined} logout={logout}>
                    <main className="py-4 w-full">
                        {children ? children : <Outlet />}
                    </main>
                </AdminSidebar>
                <ChatbotWidget />
            </div>
        );
    }
    return (
        <div>
            <Header />
            <div className="max-w-[1280px] mx-auto px-4 ">
                <main className="py-4">
                    {children ? children : <Outlet />}
                </main>
            </div>
            <ChatbotWidget />
        </div>
    );
};

export default PageLayout;

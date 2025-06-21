import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { adminLinks } from '../constants/links.const';
import type { AdminSidebarProps } from '../types/admin-sidebar.type';
import { Menu, X } from 'lucide-react';

const AdminSidebar: React.FC<AdminSidebarProps> = ({ user, logout, children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = async () => {
        if (logout) {
            await logout();
            navigate('/');
        }
    };

    // Agrupar enlaces por grupo
    const groupedLinks = adminLinks.reduce((acc, link) => {
        const group = link.group || 'OTROS';
        if (!acc[group]) acc[group] = [];
        acc[group].push(link);
        return acc;
    }, {} as Record<string, typeof adminLinks>);

    // Sidebar content (reusable for desktop and mobile)
    const sidebarContent = (
        <nav className="flex-1 flex flex-col gap-4 mt-8 md:mt-0 overflow-y-auto h-full max-h-screen pr-1 scrollbar-none">
            {Object.entries(groupedLinks).map(([group, links]) => (
                <div key={group}>
                    <div className="px-2 py-1 text-xs font-bold uppercase text-muted-foreground tracking-widest mb-1">
                        {group}
                    </div>
                    <div className="flex flex-col gap-1">
                        {links.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`px-3 py-2 rounded-md font-cap-link text-base transition-colors hover:bg-secondary/20 hover:text-secondary ${location.pathname === link.to ? 'bg-secondary/30 text-secondary font-bold' : ''}`}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    );

    // Header superior fijo en móvil
    const mobileHeader = (
        <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-primary flex items-center px-4 z-50 shadow">
            <button
                className="mr-3 text-primary-foreground"
                onClick={() => setOpen(true)}
                aria-label="Abrir menú"
            >
                <Menu size={28} />
            </button>
            <img src="/logo-gluten-free-home.png" alt="Logo" className="h-10 w-10 rounded-full mr-3" />
            <span className="font-cap-logo text-lg font-bold text-primary-foreground">Admin</span>
        </div>
    );

    return (
        <div className="flex min-h-screen">
            {/* Header móvil */}
            {mobileHeader}

            {/* Sidebar desktop */}
            <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-40 md:w-56 md:bg-primary md:text-primary-foreground md:py-6 md:px-4">
                <div className="flex items-center gap-3 mb-8">
                    <img src="/logo-gluten-free-home.png" alt="Logo" className="h-12 w-12 rounded-full" />
                    <span className="font-cap-logo text-lg font-bold">Admin</span>
                </div>
                {sidebarContent}
                <div className="mt-auto flex flex-col gap-2 border-t border-primary-foreground/20 pt-4">
                    {user && (
                        <span className="text-sm font-medium">{user.nombreCompleto ?? user.nombreUsuario}</span>
                    )}
                    {logout && (
                        <button onClick={handleLogout} className="text-left text-sm text-destructive hover:text-destructive/80 transition-colors">Cerrar sesión</button>
                    )}
                </div>
            </div>

            {/* Sidebar móvil (drawer) */}
            {open && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Fondo oscuro para cerrar */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    <div className="relative w-64 max-w-[90vw] h-full bg-primary text-primary-foreground flex flex-col py-6 px-4 animate-slide-in-left">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <img src="/logo-gluten-free-home.png" alt="Logo" className="h-10 w-10 rounded-full" />
                                <span className="font-cap-logo text-lg font-bold">Admin</span>
                            </div>
                            <button
                                className="text-primary-foreground"
                                onClick={() => setOpen(false)}
                                aria-label="Cerrar menú"
                            >
                                <X size={28} />
                            </button>
                        </div>
                        {sidebarContent}
                        <div className="mt-auto flex flex-col gap-2 border-t border-primary-foreground/20 pt-4">
                            {user && (
                                <span className="text-sm font-medium">{user.nombreCompleto ?? user.nombreUsuario}</span>
                            )}
                            {logout && (
                                <button onClick={handleLogout} className="text-left text-sm text-destructive hover:text-destructive/80 transition-colors">Cerrar sesión</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Contenido principal */}
            <main className="flex-1 pt-16 md:pt-0 md:ml-56 bg-background min-h-screen">
                {children}
            </main>
        </div>
    );
};

export default AdminSidebar; 

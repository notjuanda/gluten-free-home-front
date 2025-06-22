import { type FC, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn, LogOut, Menu, X } from 'lucide-react';
import clsx from 'clsx';

import type { LinkItem } from '../types/link.type';
import type { User } from '@/modules/admin/types/users.types';
import { RenderLink } from './RenderLink';
import { useCart } from '@/modules/clients/context/CartContext';

const buttonBase =
    'flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors';

interface Props {
    links: LinkItem[];
    user?: User;
    logout?: () => void;
    showSearch?: boolean;
}

export const BaseHeader: FC<Props> = ({ links, user, logout, showSearch }) => {
    const navigate      = useNavigate();
    const [open, setOpen] = useState(false);
    const { cartItemCount } = useCart();
    const [isAnimating, setIsAnimating] = useState(false);
    const toggleMenu    = () => setOpen((o) => !o);

    // Animación cuando cambia el número de productos
    useEffect(() => {
        if (cartItemCount > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [cartItemCount]);

    return (
        <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3 md:gap-6">
            <div className="flex items-center gap-4">
                <Link to="/" className="shrink-0">
                    <img
                        src="/logo-gluten-free-home.png"
                        alt="Gluten-Free Home"
                        className="h-12 w-12 rounded-full"
                    />
                </Link>

                {user && showSearch && (
                <input
                    type="search"
                    placeholder="Buscar cualquier cosa"
                    className="hidden w-72 flex-auto rounded-md bg-background px-4 py-2
                            text-sm placeholder:text-muted-foreground focus:outline-none
                            focus:ring-2 focus:ring-secondary md:block"
                />
                )}
            </div>

            <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
                {links.map((l) => (
                    <RenderLink key={l.to} {...l} />
                ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
                {user && (
                    <button
                        onClick={() => navigate('/carrito')}
                        aria-label="Carrito"
                        className="relative rounded-full p-2 hover:bg-primary-foreground/10"
                    >
                        <ShoppingCart size={22} />
                        {cartItemCount > 0 && (
                            <span className={clsx(
                                "absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold transition-all duration-300",
                                isAnimating && "scale-125"
                            )}>
                                {cartItemCount > 99 ? '99+' : cartItemCount}
                            </span>
                        )}
                    </button>
                )}
                
                <div className="hidden items-center gap-4 md:flex">
                {user ? (
                    <>
                        <span className="text-sm">
                            Hola,&nbsp;
                            <strong>{user.nombreCompleto ?? user.nombreUsuario}</strong>
                        </span>
                        <button
                            onClick={() => {
                                logout?.();
                                navigate('/');
                            }}
                            className={clsx(buttonBase, 'hover:underline')}
                        >
                            <LogOut size={18} /> Cerrar sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={clsx(buttonBase, 'hover:underline')}>
                            <LogIn size={18} /> Iniciar sesión
                        </Link>
                        <Link
                            to="/register"
                            className={clsx(
                            buttonBase,
                            'bg-secondary text-secondary-foreground hover:bg-secondary/90',
                            )}
                        >
                            Registrar
                        </Link>
                    </>
                )}
                </div>

                <button onClick={toggleMenu} className="md:hidden" aria-label="Menú">
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
        </div>

        <div
            className={clsx(
            'bg-primary transition-[max-height] overflow-hidden md:hidden',
            open ? 'max-h-96' : 'max-h-0',
            )}
        >
            {user && showSearch && (
            <div className="px-4 pb-4">
                <input
                type="search"
                placeholder="Buscar cualquier cosa"
                className="w-full rounded-md bg-background px-4 py-2 text-sm
                            placeholder:text-muted-foreground focus:outline-none
                            focus:ring-2 focus:ring-secondary"
                />
            </div>
            )}

            <nav className="flex flex-col gap-4 px-4 pb-6">
            {links.map((l) => (
                <RenderLink
                key={l.to}
                {...l}
                closeMobile={() => setOpen(false)}
                />
            ))}

            {user ? (
                <button
                onClick={() => {
                    logout?.();
                    setOpen(false);
                }}
                className={clsx(buttonBase, 'w-full justify-center hover:underline')}
                >
                <LogOut size={18} /> Cerrar sesión
                </button>
            ) : (
                <>
                <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className={clsx(buttonBase, 'w-full justify-center hover:underline')}
                >
                    <LogIn size={18} /> Iniciar sesión
                </Link>
                <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className={clsx(
                    buttonBase,
                    'w-full justify-center bg-secondary text-secondary-foreground hover:bg-secondary/90',
                    )}
                >
                    Registrar
                </Link>
                </>
            )}
            </nav>
        </div>
        </header>
    );
};

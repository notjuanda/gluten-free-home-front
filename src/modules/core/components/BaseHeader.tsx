import { type FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogIn, LogOut, Menu, X } from 'lucide-react';
import clsx from 'clsx';

import type { LinkItem } from '../types/link.type';
import { RenderLink } from './RenderLink';

const buttonBase =
    'flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors';

interface Props {
    links: LinkItem[];
    user?: any;
    logout?: () => void;
    showSearch?: boolean;
}

export const BaseHeader: FC<Props> = ({ links, user, logout, showSearch }) => {
    const navigate      = useNavigate();
    const [open, setOpen] = useState(false);
    const toggleMenu    = () => setOpen((o) => !o);

    return (
        <header className="bg-header text-white">
        <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-3 md:gap-6">
            <Link to="/" className="shrink-0">
            <img
                src="/logo-gluten-free-home.png"
                alt="Gluten-Free Home"
                className="h-12 w-12 rounded-full"
            />
            </Link>

            <button onClick={toggleMenu} className="md:hidden" aria-label="Menú">
            {open ? <X size={28} /> : <Menu size={28} />}
            </button>

            {user && showSearch && (
            <input
                type="search"
                placeholder="Buscar cualquier cosa"
                className="hidden w-72 flex-auto rounded-md bg-productBg px-4 py-2
                        text-sm placeholder:text-gray-300 focus:outline-none
                        focus:ring-2 focus:ring-highlight md:block"
            />
            )}

            <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
            {links.map((l) => (
                <RenderLink key={l.to} {...l} />
            ))}
            </nav>

            <div className="hidden items-center gap-4 md:flex">
            {user ? (
                <>
                <span className="text-sm">
                    Hola,&nbsp;
                    <strong>{user.nombreCompleto ?? user.nombreUsuario}</strong>
                </span>
                <button
                    onClick={() => navigate('/carrito')}
                    aria-label="Carrito"
                    className="rounded-md p-1 hover:bg-black/10"
                >
                    <ShoppingCart size={22} />
                </button>
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
                    'bg-button text-white hover:bg-button/90',
                    )}
                >
                    Registrar
                </Link>
                </>
            )}
            </div>
        </div>

        <div
            className={clsx(
            'bg-header transition-[max-height] overflow-hidden md:hidden',
            open ? 'max-h-96' : 'max-h-0',
            )}
        >
            {user && showSearch && (
            <div className="px-4 pb-4">
                <input
                type="search"
                placeholder="Buscar cualquier cosa"
                className="w-full rounded-md bg-productBg px-4 py-2 text-sm
                            placeholder:text-gray-300 focus:outline-none
                            focus:ring-2 focus:ring-highlight"
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
                    'w-full justify-center bg-button text-white hover:bg-button/90',
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

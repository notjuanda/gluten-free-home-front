// src/components/Header.tsx
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
    Menu,
    X,
    ShoppingCart,
    LogIn,
    LogOut,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../hooks/useAuth';

/* ───────────── L I N K  D A T A ───────────── */
const guestLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/sobre-nosotros', label: 'Sobre Nosotros' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/faqs', label: 'Faqs' },
    { to: '/blog', label: 'Blog' },
    { to: '/explorar', label: 'Explorar' },
];

const userLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/blog', label: 'Blog' },
];

/* ───────────── B A S E  C L A S S E S ───────────── */
const linkBase =
    'text-sm font-cap-link tracking-wide transition-colors hover:underline underline-offset-4';
const buttonBase =
    'flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors';

export const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    /* ---------- estado para el menú móvil ---------- */
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen((o) => !o);

    /* ---------- enlaces que corresponden ---------- */
    const links = user ? userLinks : guestLinks;

    return (
            <header className="bg-header text-white">
            <div className="mx-auto flex max-w-screen-xl items-center gap-4 px-4 py-3 md:gap-6">
                {/* Logo ─────────────────────────────────── */}
                <Link to="/" className="shrink-0">
                <img
                    src="/logo-gluten-free-home.png"
                    alt="Gluten-Free Home"
                    className="h-12 w-12 rounded-full"
                />
                </Link>

                {/* Botón hamburguesa (solo móviles) ───────── */}
                <button
                onClick={toggleMenu}
                aria-label="Abrir menú"
                className="md:hidden"
                >
                {open ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Search (solo auth, md+) ────────────────── */}
                {user && (
                <input
                    type="search"
                    placeholder="Buscar cualquier cosa"
                    className="hidden w-72 flex-auto rounded-md bg-productBg px-4 py-2 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-highlight md:block"
                />
                )}

                {/* Navegación de escritorio (md+) ─────────── */}
                <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
                {links.map(({ to, label }) => (
                    <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        clsx(
                        linkBase,
                        isActive && 'text-highlight underline decoration-2'
                        )
                    }
                    >
                    {label}
                    </NavLink>
                ))}
                </nav>

                {/* Acciones a la derecha (escritorio) ─────── */}
                <div className="hidden items-center gap-4 md:flex">
                {user ? (
                    <>
                    <span className="text-sm">
                        Hola de nuevo,&nbsp;
                        <strong>
                        {user.nombreCompleto ?? user.nombreUsuario}
                        </strong>
                    </span>

                    <button
                        onClick={() => navigate('/carrito')}
                        aria-label="Carrito"
                        className="rounded-md p-1 hover:bg-black/10"
                    >
                        <ShoppingCart size={22} />
                    </button>

                    <button
                        onClick={logout}
                        className={clsx(buttonBase, 'hover:underline')}
                    >
                        <LogOut size={18} />
                        Cerrar sesión
                    </button>
                    </>
                ) : (
                    <>
                    <Link
                        to="/login"
                        className={clsx(buttonBase, 'hover:underline')}
                    >
                        <LogIn size={18} />
                        Iniciar sesión
                    </Link>

                    <Link
                        to="/registro"
                        className={clsx(
                        buttonBase,
                        'bg-button text-white hover:bg-button/90'
                        )}
                    >
                        Registrar
                    </Link>
                    </>
                )}
                </div>
            </div>

            {/* Menú deslizante para móviles ─────────────── */}
            <div
                className={clsx(
                'md:hidden transition-[max-height] overflow-hidden bg-header',
                open ? 'max-h-96' : 'max-h-0'
                )}
            >
                {/* Mostrar search también en móvil si está logueado */}
                {user && (
                <div className="px-4 pb-4">
                    <input
                    type="search"
                    placeholder="Buscar cualquier cosa"
                    className="w-full rounded-md bg-productBg px-4 py-2 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-highlight"
                    />
                </div>
                )}

                <nav className="flex flex-col gap-4 px-4 pb-6">
                {links.map(({ to, label }) => (
                    <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                        clsx(
                        linkBase,
                        isActive && 'text-highlight underline decoration-2'
                        )
                    }
                    >
                    {label}
                    </NavLink>
                ))}

                {/* acciones móviles */}
                {user ? (
                    <button
                    onClick={() => {
                        logout();
                        setOpen(false);
                    }}
                    className={clsx(buttonBase, 'w-full justify-center hover:underline')}
                    >
                    <LogOut size={18} />
                    Cerrar sesión
                    </button>
                ) : (
                    <>
                    <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className={clsx(buttonBase, 'w-full justify-center hover:underline')}
                    >
                        <LogIn size={18} />
                        Iniciar sesión
                    </Link>
                    <Link
                        to="/registro"
                        onClick={() => setOpen(false)}
                        className={clsx(
                        buttonBase,
                        'w-full justify-center bg-button text-white hover:bg-button/90'
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

export default Header;

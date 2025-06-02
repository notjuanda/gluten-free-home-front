import { useState } from 'react';
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import {
    Menu,
    X,
    ShoppingCart,
    LogIn,
    LogOut,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '../hooks/useAuth';
import { Link as ScrollLink } from 'react-scroll';

const guestLinks = [
    { to: '/#', label: 'Inicio' },
    { to: '/#sobre-nosotros', label: 'Sobre Nosotros' },
    { to: '/#faqs', label: 'Faqs' },
    { to: '/blog', label: 'Blog' },
    { to: '/explorar', label: 'Explorar' },
];

const userLinks = [
    { to: '/#', label: 'Inicio' },
    { to: '/blog', label: 'Blog' },
];

const linkBase = 'cursor-pointer text-sm font-cap-link tracking-wide transition-colors hover:underline underline-offset-4';
const buttonBase = 'flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors';

export const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const toggleMenu = () => setOpen(o => !o);
    const links = user ? userLinks : guestLinks;

    const RenderLink = ({
        to,
        label,
        onClick,
    }: {
        to: string;
        label: string;
        onClick?: () => void;
    }) => {
        const targetHash = to.includes('#') ? to.slice(to.indexOf('#')) : null;
        const isActiveHash =
            targetHash === '#'
                ? location.hash === '' || location.hash === '#'
                : targetHash && location.hash === targetHash;
        const isActivePath = !targetHash && location.pathname === to;
        const active = isActiveHash || isActivePath;
        const activeCls = active ? 'text-highlight underline decoration-2' : '';

        if (targetHash) {
            const id = targetHash === '#' ? 'top' : targetHash.replace('#', '');
            return (
                <ScrollLink
                    to={id}
                    smooth
                    duration={600}
                    offset={-80}
                    onClick={onClick}
                    className={clsx(linkBase, activeCls)}
                >
                    {label}
                </ScrollLink>
            );
        }

        return (
            <NavLink
                to={to}
                onClick={onClick}
                className={() => clsx(linkBase, activeCls)}
            >
                {label}
            </NavLink>
        );
    };

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
                <button onClick={toggleMenu} aria-label="Abrir menú" className="md:hidden">
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
                {user && (
                    <input
                        type="search"
                        placeholder="Buscar cualquier cosa"
                        className="hidden w-72 flex-auto rounded-md bg-productBg px-4 py-2
                                             text-sm placeholder:text-gray-300 focus:outline-none
                                             focus:ring-2 focus:ring-highlight md:block"
                    />
                )}
                <nav className="hidden flex-1 items-center justify-center gap-6 md:flex">
                    {links.map(({ to, label }) => (
                        <RenderLink key={to} to={to} label={label} />
                    ))}
                </nav>
                <div className="hidden items-center gap-4 md:flex">
                    {user ? (
                        <>
                            <span className="text-sm">
                                Hola de nuevo,&nbsp;
                                <strong>{user.nombreCompleto ?? user.nombreUsuario}</strong>
                            </span>
                            <button
                                onClick={() => navigate('/carrito')}
                                aria-label="Carrito"
                                className="rounded-md p-1 hover:bg-black/10"
                            >
                                <ShoppingCart size={22} />
                            </button>
                            <button onClick={logout} className={clsx(buttonBase, 'hover:underline')}>
                                <LogOut size={18} />
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={clsx(buttonBase, 'hover:underline')}>
                                <LogIn size={18} />
                                Iniciar sesión
                            </Link>
                            <Link
                                to="/registro"
                                className={clsx(buttonBase, 'bg-button text-white hover:bg-button/90')}
                            >
                                Registrar
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div
                className={clsx(
                    'md:hidden transition-[max-height] overflow-hidden bg-header',
                    open ? 'max-h-96' : 'max-h-0'
                )}
            >
                {user && (
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
                    {links.map(({ to, label }) => (
                        <RenderLink
                            key={to}
                            to={to}
                            label={label}
                            onClick={() => setOpen(false)}
                        />
                    ))}
                    {user ? (
                        <button
                            onClick={() => {
                                logout();
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

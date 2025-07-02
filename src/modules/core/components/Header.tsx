import { useAuth } from '../hooks/useAuth';
import GuestHeader  from './GuestHeader';
import ClientHeader from './ClientHeader';
import SellerHeader from './SellerHeader';
import EditorHeader from './EditorHeader';

const Header = () => {
    const { user, logout } = useAuth();

    if (!user) return <GuestHeader />;

    const roles = user.roles?.map((r: { nombre: string }) => r.nombre.trim().toLowerCase()) ?? [];

    if (roles.includes('vendedor')) return <SellerHeader user={user} logout={logout} />;
    if (roles.includes('editor'))   return <EditorHeader user={user} logout={logout} />;

    return <ClientHeader user={user} logout={logout} />;
};

export default Header;

import type { LinkItem } from '../types/link.type';

export const guestLinks: LinkItem[] = [
    { to: '/', label: 'Inicio' },
    { to: '/#sobre-nosotros', label: 'Sobre Nosotros' },
    { to: '/#faqs', label: 'Faqs' },
    { to: '/blog', label: 'Blog' },
    { to: '/explorar', label: 'Explorar' },
];

export const clientLinks: LinkItem[] = [
    { to: '/', label: 'Inicio' },
    { to: '/blog', label: 'Blog' },
];

export const adminLinks: LinkItem[] = [
    { to: '/admin/dashboard',    label: 'Dashboard' },
    { to: '/admin/usuarios',     label: 'Usuarios'  },
    { to: '/admin/permisos',     label: 'Permisos'  },
];

export const sellerLinks: LinkItem[] = [
    { to: '/vendedor/dashboard', label: 'Panel'         },
    { to: '/vendedor/productos', label: 'Mis Productos' },
];

export const editorLinks: LinkItem[] = [
    { to: '/editor/dashboard',  label: 'Panel'      },
    { to: '/editor/articulos',  label: 'Artículos'  },
];

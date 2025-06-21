import type { LinkItem } from '../types/link.type';

export const guestLinks: LinkItem[] = [
    { to: '/', label: 'Inicio' },
    { to: '/#sobre-nosotros', label: 'Sobre Nosotros' },
    { to: '/#faqs', label: 'Faqs' },
    { to: '/blog', label: 'Blog' },
    { to: '/explorar', label: 'Explorar' },
];

export const clientLinks: LinkItem[] = [
    { to: '/blog', label: 'Blog' },
    { to: '/explorar', label: 'Inicio' },
];

export const adminLinks: LinkItem[] = [
    // GENERAL
    { to: '/admin/dashboard', label: 'Dashboard', group: 'GENERAL' },

    // USUARIOS Y PERMISOS
    { to: '/admin/usuarios', label: 'Usuarios', group: 'USUARIOS Y PERMISOS' },
    { to: '/admin/roles', label: 'Roles y permisos', group: 'USUARIOS Y PERMISOS' },

    // PRODUCTOS
    { to: '/admin/productos', label: 'Productos', group: 'PRODUCTOS' },
    { to: '/admin/categorias-producto', label: 'Categorías de producto', group: 'PRODUCTOS' },
    { to: '/admin/marcas', label: 'Marcas', group: 'PRODUCTOS' },
    { to: '/admin/ingredientes', label: 'Ingredientes', group: 'PRODUCTOS' },

    // ÓRDENES Y PAGOS
    { to: '/admin/ordenes', label: 'Órdenes', group: 'ÓRDENES Y PAGOS' },
    { to: '/admin/pagos', label: 'Pagos', group: 'ÓRDENES Y PAGOS' },

    // CONTENIDO
    { to: '/admin/articulos', label: 'Artículos', group: 'CONTENIDO' },
    { to: '/admin/categorias-blog', label: 'Categorías de blog', group: 'CONTENIDO' },
    { to: '/admin/comentarios', label: 'Comentarios', group: 'CONTENIDO' },
];

export const sellerLinks: LinkItem[] = [
    { to: '/vendedor/dashboard', label: 'Panel'         },
    { to: '/vendedor/productos', label: 'Mis Productos' },
];

export const editorLinks: LinkItem[] = [
    { to: '/editor/dashboard',  label: 'Panel'      },
    { to: '/editor/articulos',  label: 'Artículos'  },
];

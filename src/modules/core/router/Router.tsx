import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout.tsx";
import UsersPage from "@/modules/admin/pages/users/UserPage.tsx";
import RolesPage from "@/modules/admin/pages/roles/RolesPage.tsx";
import CreateRolePage from "@/modules/admin/pages/roles/CreateRolePage.tsx";
import EditRolePage from "@/modules/admin/pages/roles/EditRolePage.tsx";
import ProductsPage from "@/modules/admin/pages/productos/ProductsPage.tsx";
import CreateProductPage from "@/modules/admin/pages/productos/CreateProductPage.tsx";
import BrandsPage from "@/modules/admin/pages/brands/BrandsPage.tsx";
import CategoriesPage from "@/modules/admin/pages/categories/CategoriesPage.tsx";
import IngredientsPage from "@/modules/admin/pages/ingredients/IngredientsPage.tsx";
import OrdersPage from "@/modules/admin/pages/orders/OrdersPage.tsx";
import PaymentsPage from "@/modules/admin/pages/payments/PaymentsPage.tsx";
import ArticlesPage from "@/modules/admin/pages/articles/ArticlesPage.tsx";
import CreateArticlePage from "@/modules/admin/pages/articles/CreateArticlePage.tsx";
import EditArticlePage from "@/modules/admin/pages/articles/EditArticlePage.tsx";
import ArticlePreviewPage from "@/modules/admin/pages/articles/ArticlePreviewPage.tsx";
import CategoriasBlogPage from "@/modules/admin/pages/categorias-blog/CategoriasBlogPage.tsx";
import AdminCommentsPage from '@/modules/admin/pages/comments/AdminCommentsPage';
import React, { Suspense } from 'react';

// Declaraciones de React.lazy para páginas de clientes y home
const Home = React.lazy(() => import('@/modules/home/pages/Home'));
const LoginPage = React.lazy(() => import('@/modules/auth/pages/LoginPage'));
const RegisterPage = React.lazy(() => import('@/modules/auth/pages/RegisterPage'));
const VerifyEmailPage = React.lazy(() => import('@/modules/auth/pages/VerifyEmailPage'));
const ClientCatalogPage = React.lazy(() => import('@/modules/clients/pages/ClientCatalogPage'));
const CartPage = React.lazy(() => import('@/modules/clients/pages/CartPage'));
const PaymentSuccessPage = React.lazy(() => import('@/modules/clients/pages/PaymentSuccessPage'));
const PaymentCancelPage = React.lazy(() => import('@/modules/clients/pages/PaymentCancelPage'));
const MyOrdersPage = React.lazy(() => import('@/modules/clients/pages/MyOrdersPage'));
const ProductDetailPage = React.lazy(() => import('@/modules/clients/pages/ProductDetailPage'));
const BlogListPage = React.lazy(() => import('@/modules/clients/pages/BlogListPage'));
const BlogDetailPage = React.lazy(() => import('@/modules/clients/pages/BlogDetailPage'));

const router = createBrowserRouter([ 
    {
        element: <PageLayout />,
        children: [
            {
                path: "/",
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><Home /></Suspense>,
            },
            {
                path: "/login",     
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><LoginPage /></Suspense>,
            },
            {
                path: "/register",
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><RegisterPage /></Suspense>,
            },
            {
                path: "/verify-email",
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><VerifyEmailPage /></Suspense>,
            },
            {   
                path: "/admin/dashboard",
                element: <UsersPage />,
            },
            {
                path: "/admin/usuarios",
                element: <UsersPage />,
            },
            {
                path: "/admin/roles",
                element: < RolesPage/>,
            },
            {
                path: "/admin/roles/crear",
                element: <CreateRolePage />,
            },
            {
                path: "/admin/roles/:id/editar",
                element: <EditRolePage />,
            },
            {
                path: "/admin/productos",
                element: <ProductsPage />,
            },
            {
                path: "/admin/productos/crear",
                element: <CreateProductPage />,
            },
            {
                path: "admin/marcas",
                element: <BrandsPage />,
            },
            {
                path: "admin/categorias-producto",
                element: <CategoriesPage />,
            },
            {
                path: "admin/ingredientes",
                element: <IngredientsPage />,
            },
            {
                path: "admin/ordenes",
                element: <OrdersPage />,
            },
            {
                path: "admin/pagos",
                element: <PaymentsPage />,
            },
            {
                path: "admin/articulos",
                element: <ArticlesPage />,
            },
            {
                path: "admin/articulos/:id/vista-previa",
                element: <ArticlePreviewPage />,
            },
            {
                path: "admin/articulos/:id/editar",
                element: <EditArticlePage />,
            },
            {
                path: "admin/articulos/crear",
                element: <CreateArticlePage />,
            },
            {
                path: "admin/categorias-blog",
                element: <CategoriasBlogPage />,
            },
            {
                path: "admin/comentarios",
                element: <AdminCommentsPage />,
            },
            {
                path: "explorar",
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><ClientCatalogPage /></Suspense>,
            },
            {
                path: '/carrito',
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><CartPage /></Suspense>,
            },
            {
                path: '/payment/success',
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><PaymentSuccessPage /></Suspense>,
            },
            {
                path: '/payment/cancel',
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><PaymentCancelPage /></Suspense>,
            },
            {
                path: '/mis-pedidos',
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><MyOrdersPage /></Suspense>,
            },
            {
                path: '/producto/:slug',
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><ProductDetailPage /></Suspense>,
            },
            {
                path: '/blog',
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><BlogListPage /></Suspense>,
            },
            {
                path: '/blog/:slug',
                element: <Suspense fallback={<div className='py-16 text-center'>Cargando...</div>}><BlogDetailPage /></Suspense>,
            },
        ],
    },
]);

export default router;

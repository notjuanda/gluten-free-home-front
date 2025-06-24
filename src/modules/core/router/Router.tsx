import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout.tsx";
import Home from "@/modules/home/pages/Home.tsx";
import LoginPage from "@/modules/auth/pages/LoginPage.tsx";
import UsersPage from "@/modules/admin/pages/users/UserPage.tsx";
import RegisterPage from "@/modules/auth/pages/RegisterPage.tsx";
import VerifyEmailPage from "@/modules/auth/pages/VerifyEmailPage.tsx";
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
import ClientCatalogPage from "@/modules/clients/pages/ClientCatalogPage.tsx";
import CartPage from "@/modules/clients/pages/CartPage.tsx";
import PaymentSuccessPage from "@/modules/clients/pages/PaymentSuccessPage.tsx";
import PaymentCancelPage from "@/modules/clients/pages/PaymentCancelPage.tsx";
import MyOrdersPage from '@/modules/clients/pages/MyOrdersPage.tsx';
import ProductDetailPage from '@/modules/clients/pages/ProductDetailPage';
import ArticlesPage from "@/modules/admin/pages/articles/ArticlesPage.tsx";
import CreateArticlePage from "@/modules/admin/pages/articles/CreateArticlePage.tsx";
import EditArticlePage from "@/modules/admin/pages/articles/EditArticlePage.tsx";

const router = createBrowserRouter([ 
    {
        element: <PageLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",     
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/verify-email",
                element: <VerifyEmailPage />,
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
                path: "admin/articulos/:id/editar",
                element: <EditArticlePage />,
            },
            {
                path: "admin/articulos/crear",
                element: <CreateArticlePage />,
            },
            {
                path: "explorar",
                element: <ClientCatalogPage />,
            },
            {
                path: '/carrito',
                element: <CartPage />,
            },
            {
                path: '/payment/success',
                element: <PaymentSuccessPage />,
            },
            {
                path: '/payment/cancel',
                element: <PaymentCancelPage />,
            },
            {
                path: '/mis-pedidos',
                element: <MyOrdersPage />,
            },
            {
                path: '/producto/:id',
                element: <ProductDetailPage />,
            },
        ],
    },
]);

export default router;

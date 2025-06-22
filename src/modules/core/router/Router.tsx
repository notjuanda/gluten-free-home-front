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
                path: "explorar",
                element: <ClientCatalogPage />,
            },
            {
                path: '/carrito',
                element: <CartPage />,
            }
        ],
    },
]);

export default router;

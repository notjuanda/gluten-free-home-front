import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout.tsx";
import Home from "@/modules/home/pages/Home.tsx";
import LoginPage from "@/modules/auth/pages/LoginPage.tsx";
import UsersPage from "@/modules/admin/pages/users/UserPage.tsx";
import RegisterPage from "@/modules/auth/pages/RegisterPage.tsx";
import VerifyEmailPage from "@/modules/auth/pages/VerifyEmailPage.tsx";

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
                path: "/admin/dashboard",
                element: <UsersPage />,
            },
            {
                path: "/verify-email",
                element: <VerifyEmailPage />,
            }
        ],
    },
]);

export default router;

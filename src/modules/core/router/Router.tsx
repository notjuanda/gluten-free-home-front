import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout.tsx";
import Home from "@/modules/home/pages/Home.tsx";
import LoginPage from "@/modules/auth/pages/LoginPage.tsx";
import UsersPage from "@/modules/admin/pages/users/UserPage.tsx";

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
                path: "/admin/dashboard",
                element: <UsersPage />,
            }
        ],
    },
]);

export default router;

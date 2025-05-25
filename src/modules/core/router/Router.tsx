import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout.tsx";

const router = createBrowserRouter([ 
    {
        element: <PageLayout />,
        children: [
        ],
    },
]);

export default router;

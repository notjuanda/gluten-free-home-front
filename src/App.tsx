import {RouterProvider} from "react-router-dom";
import router from "./modules/core/router/Router.tsx";
import { AuthProvider } from "./modules/core/providers/AuthProvider.tsx";

const App = ()=>{
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    )
}
export default App;
import {RouterProvider} from "react-router-dom";
import router from "./modules/core/router/Router.tsx";

const App = ()=>{
    return (
        <RouterProvider router={router}/>
    )
}
export default App;
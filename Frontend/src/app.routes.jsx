import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/home/components/Home";

export const router = createBrowserRouter([
    {
        element:<Protected/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
        ]
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])
import {
    createBrowserRouter,
  } from "react-router-dom";
import LayOut from "../MainLayOut/LayOut";
import Home from "../pages/Homes/Home/Home";
import Login from "../pages/UserLogin/Login";
import Registration from "../pages/UserRegistration/Registration";


// create here all route 
 export  const router = createBrowserRouter([
    {
      path: "/",
      element:<LayOut></LayOut>,
    //   errorElement: <ErrorPage />,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
            path:"'/register'",
            element:<Registration></Registration>
        },
    ]
    },
    
  ]);
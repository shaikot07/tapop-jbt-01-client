import {
    createBrowserRouter,
  } from "react-router-dom";
import LayOut from "../MainLayOut/LayOut";
import Home from "../pages/Homes/Home/Home";
import Login from "../pages/UserLogin/Login";
import Registration from "../pages/UserRegistration/Registration";
import UserProfileDittles from "../pages/User/UserProfileDittles";
import ErrorPages from "../Component/ErrorPages";


// create here all route 
 export  const router = createBrowserRouter([
    {
      path: "/",
      element:<LayOut></LayOut>,
      errorElement: <ErrorPages></ErrorPages>,
    children:[
        {
            path:"/",
            element:<Login></Login>
        },
        {
            path:"/home",
            element:<Home></Home>
        },
        {
            path:"/login",
            element:<Login></Login>
        },
        {
            path:"/profileDittles",
            element:<UserProfileDittles></UserProfileDittles>
        },
        {
            path:"/register",
            element:<Registration></Registration>
        },
    ]
    },
    
  ]);
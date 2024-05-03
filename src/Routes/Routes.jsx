import {
    createBrowserRouter,
  } from "react-router-dom";
import LayOut from "../MainLayOut/LayOut";
import Home from "../pages/Homes/Home/Home";


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
        }
    ]
    },
    
  ]);
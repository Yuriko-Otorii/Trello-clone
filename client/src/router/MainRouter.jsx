import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/Signup"));
const Home = lazy(() => import("../pages/Home"));
const DashBoard = lazy(() => import("../pages/DashBoard"));

const router = createBrowserRouter([
  {path: "/home", element: <Home />},
  {path: "/dashboard", element: <DashBoard />},
  {path: "/login", element: <Login />},
  {path: "/signup", element: <SignUp />}
])

const MainRouter = () => {
  return (
    <Suspense
        fallback={
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            </div>
          </div>
        }
      >    
        <RouterProvider router={router} />        
      </Suspense>
  )
}

export default MainRouter
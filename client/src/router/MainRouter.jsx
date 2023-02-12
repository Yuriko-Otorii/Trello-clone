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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ textAlign: "center", margin: "2rem auto" }}>
              Loading...
            </h1>
          </div>
        }
      >    
        <RouterProvider router={router} />        
      </Suspense>
  )
}

export default MainRouter
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));


const router = createBrowserRouter([
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
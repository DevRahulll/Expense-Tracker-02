import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./app/layout/Layout";
import Home from "./app/pages/Home.jsx";
import AuthLayout from "./app/layout/AuthLayout.jsx";
import PublicRoutes from "./app/routes/PublicRoutes.jsx";
import Login from "./app/pages/Login.jsx";
import Register from "./app/pages/Register.jsx";
import ProtectedRoutes from "./app/routes/ProtectedRoutes.jsx";
import Dashboard from "./app/pages/Dashboard.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            element: <ProtectedRoutes />,
            children: [
                {
                    path: "/dashboard",
                    element: <Dashboard />,
                },
            ],
        },
        {
            element: <PublicRoutes />,
            children: [
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;

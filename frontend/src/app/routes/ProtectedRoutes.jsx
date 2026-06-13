import React from "react";
import { Navigate, Outlet } from "react-router";
import useAuthStore from "../state/useAuthStore.js";

const ProtectedRoutes = () => {
    const { user } = useAuthStore();

    if (!user) return <Navigate to={"/login"} replace />;

    return <Outlet />;
};

export default ProtectedRoutes;

import React from "react";
import useAuthStore from "../state/useAuthStore";
import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
    const { user } = useAuthStore();

    if (user) return <Navigate to={"/dashboard"} />;

    return <Outlet />;
};

export default PublicRoutes;

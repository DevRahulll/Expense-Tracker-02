import React from "react";
import { createBrowserRouter, Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <div className="">
            <nav className="flex items-center justify-between">
                <a href="#">Home</a>
                <a href="#">Contact</a>
                <a href="#">About</a>
                <a href="#">Sign up</a>
            </nav>
            <Outlet />
            <footer className="bottom-0 text-center">
                <p className="">Made with ❤️‍🔥 by Dev</p>
            </footer>
        </div>
    );
};

export default AuthLayout;

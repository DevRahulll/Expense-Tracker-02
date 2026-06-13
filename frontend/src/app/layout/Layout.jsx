import React from "react";
import { Outlet } from "react-router";
import { useTheme } from "../state/useTheme";

const Layout = () => {
    const toggleTheme = useTheme((state) => state.toggleTheme);
    const theme = useTheme((state) => state.theme);
    return (
        <div className="">
            <div className="drawer">
                <input
                    id="my-drawer-1"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-1" className="btn drawer-button">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer-1"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <li>
                            <a>Sidebar Item 1</a>
                        </li>
                        <li>
                            <button
                                className="btn btn-sm"
                                onClick={toggleTheme}
                            >
                                {theme === "abyss" ? "☀️ Light" : "🌙 Dark"}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <Outlet />
            <footer className="text-center">
                <h2>Footer</h2>
            </footer>
        </div>
    );
};

export default Layout;

import React, { useEffect } from "react";
import { useTheme } from "../state/useThemeStore.jsx";

function ThemeProvider({ children }) {
    const theme = useTheme((state) => state.theme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return children;
}

export default ThemeProvider;

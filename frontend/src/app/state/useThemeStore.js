import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTheme = create(
    persist(
        (set) => ({
            theme: "abyss",

            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === "abyss" ? "light" : "abyss",
                })),
        }),
        {
            name: "theme-storage",
        },
    ),
);

import { create } from "zustand";
import { apiInstance } from "../config/apiInstance.js";

export default userStore = create((set) => ({
    user: null,
    isUserLoading: false,

    register: async (data) => {
        set({ isUserLoading: true });
        try {
            const response = await apiInstance.post("/users/register", data);
            set({ user: response.data.data });
            return true;
        } catch (error) {
            console.error("Error in registering User", error);
            return false;
        } finally {
            set({ isUserLoading: false });
        }
    },

    login: async (data) => {
        set({ isUserLoading: true });
        try {
            const response = await apiInstance.post("/user/login", data);
            set({ user: response?.data?.data });
            return true;
        } catch (error) {
            console.error("Login Error", error);
            return false;
        } finally {
            set({ isUserLoading: false });
        }
    },

    getUser: async () => {
        set({ isUserLoading: true });

        try {
            const response = await apiInstance.get("/users/profile");
            set({ user: response?.data?.data });
            return true;
        } catch (error) {
            console.error("Error in getting user", error);
            return false;
        } finally {
            set({ isUserLoading: false });
        }
    },

    logout: async () => {
        set({ isUserLoading: true });
        try {
            const response = await apiInstance.post("/users/logout");
            set({ user: null });
            return true;
        } catch (error) {
            console.error("Logout Failed", error);
            return false;
        } finally {
            set({ isUserLoading: false });
        }
    },
}));

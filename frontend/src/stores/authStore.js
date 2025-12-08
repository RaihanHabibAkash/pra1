import { axiosInstance } from "@/lib/axiosConnect";
import { create } from "zustand";

export const authStore = create(set => {
    return {
        isLoading: false,
        error: null,
        isAdmin: false,
        checkAdmin: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance.get("/admin");
                set({ isAdmin: response.data.admin });
            } catch (error) {
                set({ isAdmin: false, error: error.response.data.message });
            } finally {
                set({ isLoading: false });
            }
        },
        reset: () => {
            set({ 
                isAdmin: false, 
                isLoading: false, 
                error: null 
            });
        }

    }
})
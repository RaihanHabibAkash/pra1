import { create } from "zustand";
import { axiosInstance } from "@/lib/axiosConnect";

export const albumStore =  create((set) => {
    return {
        albums: [],
        isLoading: false,
        error: null,
        fetchAlbums: async () => {
            set({ isLoading: true, error: null });
            try {
                const response = await axiosInstance.get("/albums");
                set({ albums: response.data.albums || [] });
            } catch (error) {
                set({ error: error.response.data.message });
            } finally {
                set({ isLoading: false })
            }
        }
    }
})
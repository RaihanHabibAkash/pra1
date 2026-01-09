import { axiosInstance } from "@/lib/axiosConnect";
import { create } from "zustand";

export const musicStore = create(set => {
    return {
        isLoading: false,
        error: null,
        songs: [],
        featuredSongs: [],
        madeForYouSongs: [],
        trendingSongs: [],
        favGenreSongs: [],
        favLanguageSongs: [],
        likedSongs: [],
        recentlyPlayedSongs: [],
        isLiked: false,

        fetchSongs: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance.get("/admin/songs");
                set({ songs: response.data });
            } catch (error) {
                set({ error: error.response.data.message })
            } finally {
                set({ isLoading: false })
            }

        },

        fetchFeaturedSongs: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance.get("/songs/fetured-songs");
                set({ featuredSongs: response.data.songs });     
            } catch (error) {
                set({ error: error.response.data.message })
            } finally {
                set({ isLoading: false })
            }

        }, 

        fetchMadeForYouSongs: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance.get("/songs/made-for-you-songs");
                set({ madeForYouSongs: response.data.songs });
            } catch (error) {
                set({ error: error.response.data.message })
            } finally {
                set({ isLoading: false })
            }

        },

        fetchTrendingSongs: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance.get("/songs/trending-songs");
                set({ trendingSongs: response.data.songs });
            } catch (error) {
                set({ error: error.response.data.message })
            } finally {
                set({ isLoading: false })
            }

        },

        fetchFavGenreSongs: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance("/songs/fav-genre-songs");
                set({ favGenreSongs: response.data.songs });
            } catch (error) {
                set({ error: error.response.data.message })
            } finally {
                set({ isLoading: false })
            }

        },

        fetchFavLanguageSongs: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance("/songs/fav-language-songs");
                set({ favLanguageSongs: response.data.songs });
            } catch (error) {
                set({ error: error.response.data.message })
            } finally {
                set({ isLoading: false })
            }

        },

        fetchLikedSongs: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance("/songs/liked-songs");
                set({ likedSongs: response.data.forSongs });
            } catch (error) {
                set({ error: error.response.data.message })
            } finally {
                set({ isLoading: false })
            }

        },

        fetchRecentlyPlayedSongs: async () => {
            set({ isLoading: true, error: null });

            try {
                const response = await axiosInstance("/songs/recently-played-songs");
                set({ recentlyPlayedSongs: response.data.forSongs });
            } catch (error) {
                set({ error: error.response.data.message })
            } finally {
                set({ isLoading: false })
            }

        },

        toggleLiked: async (songId) => {
            set({ isLoading: true, error: false });

            try {
                const response = await axiosInstance.post(`/user/like/${songId}`);
                const { likesCounts, liked } = response.data;
                
                set
            } catch (error) {
                
            }
        }

    }
});
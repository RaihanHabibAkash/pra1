import { create } from "zustand";

export const playerStore = create((set, get) => {
    return {
        currentSong: null,
        isPlaying: false,
        queue: [],
        currentIndex: -1,

        initializeQueue: (songs) => {
            set({
                queue: songs,
                currentSong: get().currentSong || songs[0],
                currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
            });
        },

        playAlbum: (songs, startIndex = 0) => {
            if(songs.length === 0) {
                return
            }

            // Will access from the first song
            const song = songs[startIndex];

            set({
                queue: songs,
                currentSong: song,
                currentIndex: startIndex,
                isPlaying: true
            });
        },

        setCurrentSong: (song) => {
            const songIndex = get().queue.findIndex(s => s._id === song._id);
            set({
                currentSong: song,
                isPlaying: true,
                currentIndex: songIndex !== -1 ? songIndex : get().currentIndex
            });
        },
        togglePlay: () => {
            const invetPlaying = !get().isPlaying;

            set({
                isPlaying: invetPlaying
            })
        },

        playNext: () => {
            const { currentIndex, queue } = get();
            const nextIndex = currentIndex + 1;

            // Playing if there is next index.
            if(nextIndex < queue.length) {
                const nextSong = queue[nextIndex];

                set({
                    currentSong: nextSong,
                    currentIndex: nextIndex,
                    isPlaying: true
                });
            } else {
                set({ isPlaying: false })
            }
            
        },

        playPrevious: () => {
            const { currentIndex, queue } = get();
            const previousIndex = currentIndex - 1;

            // Playing previous song there is an song
            if(currentIndex > 0) {
                const previousSong = queue[previousIndex];

                set({
                    currentSong: previousSong,
                    currentIndex: previousIndex,
                    isPlaying: true
                });
            } else {
                set({ isPlaying: false })
            }
        },
        

    }
})
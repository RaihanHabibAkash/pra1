import { create } from "zustand";

export const playerStore = create((set, get) => {
    return {
        currentSong: null,
        isPlaying: false,
        queue: [],
        currentIndex: -1,
        // isShuffling: false,

        shuffleQueue: () => {
            const { currentSong, queue } = get();
            if(queue.length < 2) return;

            const newQueue = [...queue];
            let currentIndex = newQueue.findIndex(s => s._id === currentSong._id);

            const removedSong = newQueue.splice(currentIndex, 1)[0];

            for(let i = newQueue.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));

                [newQueue[i], newQueue[j]] = [newQueue[j], newQueue[i]];
            }
            
            newQueue.unshift(removedSong);
            
            // Remains the index same.
            currentIndex = newQueue.findIndex(s => s._id === currentSong._id);

            set({
                queue: newQueue,
                currentIndex
            });
        },

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
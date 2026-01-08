import { playerStore } from "@/stores/playerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
    const { currentSong, isPlaying, playNext } = playerStore();

    const audioRef = useRef(null);
    const previousSongRef = useRef(null);

    // Handle Play.
    useEffect(() => {
        if(isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    },[ isPlaying ]);

    // Handle Play Next
    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            playNext();
        };

        audio?.addEventListener("ended", handleEnded);

        // Cleanup function for avoid memory leak.
        return () => audio?.removeEventListener("ended", handleEnded);
    },[ playNext ]);

    // To handle Song Changes
    useEffect(() => {
        if(!audioRef.current || !currentSong) return;
        const audio = audioRef.current;

        // check if it is a new song.
        const isSongChange = previousSongRef.current !== currentSong?.audioUrl;
        if(isSongChange){
            audio.src = currentSong?.audioUrl;
            // reset the playback position.
            audio.currentTime = 0;
            // Storing the new song after it starts playing.
            previousSongRef.current = currentSong?.audioUrl;
            // Play the new Song.
            if(isPlaying) audio.play();
        }
    },[ currentSong, isPlaying ]);

    return <audio ref={audioRef} />;
};

export default AudioPlayer;
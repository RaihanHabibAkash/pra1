import { useRef, useEffect } from "react";
import { playerStore } from "@/stores/playerStore";

const AudioPlayer = () => {
    const { isPlaying, currentSong, playNext } = playerStore();

    const audioRef = useRef(null);
    const previousSongRef = useRef(null);

    // Handle Play
    useEffect(() => {
        if(isPlaying) {
            audioRef.current.Play();
        } else {
            audioRef.current.pause();
        }
    },[ isPlaying ]);

    // Handle Play Next
    useEffect(() => {
        const audio = audioRef.current;
        if(!audio) return;   
        const handleEnd = () => {
            playNext()
        }

        audio.addEventListener("ended", handleEnd);
        return () => audio.removeEventListener("ended", handleEnd);
    }, [ playNext ]);

    // Handle Song Change
    useEffect(() => {
        const audio = audioRef.current;
        if(!audio || !currentSong) return;


        // If The Song Change
        if(previousSongRef.current !== currentSong.audioUrl) {
            audio.src = currentSong.audioUrl;
            audio.currentTime = 0;

            previousSongRef.current = currentSong.audioUrl;

            if(isPlaying) audio.play();
        }

    }, [ currentSong, isPlaying ]);

    return <audio ref={audioRef} />
}

export default AudioPlayer;
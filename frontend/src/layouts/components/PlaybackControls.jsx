import { playerStore } from "@/stores/playerStore";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControls = () => {
    const { currentSong, isPlaying, togglePlay, playNext, playPrevious, shuffleQueue } = playerStore();
    // const [ repeatPlay, setRepeatPlay ] = useState(false);
    // const [ isShuffle, setIsShuffle ] = useState(false);
    const [ volume, setVolume ] = useState(60);
    const [ currentTime, setCurrentTime ] = useState(0);
    const [ duration, setDuration ] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = document.querySelector("audio");
        const audio = audioRef.current;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        const handleEnd = () => {
            playerStore.setState({ isPlaying: false });
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("ended", handleEnd);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnd);
        };
    },[ currentSong ]);

    // For Dynamic value of time of song
    const handleDynamic = (value) => {
        if(audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    };

    return(
        
    );
}

export default PlaybackControls;


import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { albumStore } from "@/stores/albumStore";
import { playerStore } from "@/stores/playerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}


const AlbumPage = () => {
    const [ isMobile, setIsMobile ] = useState(false);

    useEffect(() => {
        const checkSize = () => {
            window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
        }

        checkSize();

        window.addEventListener("resize", checkSize);
        return () => window.removeEventListener("resize", checkSize);
    }, []);

    const { albumId } = useParams();
    const { fetchAlbumById, currentAlbum } = albumStore();
    const { currentSong, isPlaying, playAlbum, togglePlay } = playerStore();

    useEffect(() => {
      if(albumId) {
        fetchAlbumById(albumId)
      }
    },[fetchAlbumById, albumId]);

    const handlePlaySong = (index) => {
      if(!currentAlbum) return;

      playAlbum(currentAlbum.songs, index)
    }

    const handlePlayAlbum = () => {
      if(!currentAlbum) return;

      const isCurrentAlbumPlaying = currentSong && 
        currentAlbum.songs.some(song => song._id === currentSong._id);
      if(isCurrentAlbumPlaying) {
        togglePlay()
      }
      else {
        playAlbum(currentAlbum.songs, 0)
      }  
    }


    // For Random Colors
    const [ colors, setColors ] = useState({ 
                                    r1: 0, g1: 0, b1: 0,
                                    r2: 0, g2: 0, b2: 0,
                                  }); 
    useEffect(() => {
    const rand = () => Math.floor(Math.random() * 256);
    setColors({
      r1: rand(), g1: rand(), b1: rand(),
      r2: rand(), g2: rand(), b2: rand()
    });
  }, []);
  const gradientStyle = {
    background: `linear-gradient(
      to bottom,
      
      rgb(${colors.r1}, ${colors.g1}, ${colors.b1}) 10%,
      rgb(${colors.r2}, ${colors.g2}, ${colors.b2}) 30%,
      rgb(40,40,40) 80%
    )`
  };

  if(isMobile) {
    return (
    <div className="h-full">
        <ScrollArea className="h-full">
          <div className="relative min-h-screen">
            {/* Background Color */}
           <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0"
            style={gradientStyle}/>

            {/* Content */}
            <div className="relative z-10">
              {/* Album Header */}
              <div className="flex p-4 gap-6 pb-8 justify-center">
                <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title}
                className="size-30 shadow-lg object-cover rounded-full" />
                {/* Text things */}
                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">
                    Album
                  </p>
                  <h2 className="text-3xl font-bold my-2">
                    { currentAlbum?.title }
                  </h2>
                  <div className="flex items-center gap-2 my-2 text-sm text-white">
                    <span className="font-medium text-white">
                      • { currentAlbum?.songs.length } songs
                    </span>
                    <span className="font-medium text-white">
                      • { currentAlbum?.releaseYear }
                    </span>
                  </div>
                </div>
              </div>
              {/* Play Button */}
                <div className="px-6 pb-2 flex items-center">
                  <Button onClick={handlePlayAlbum} size="icon" className="size-12 rounded-full bg-green-500 active:bg-green-300 
                   active:scale-110 active:border-4 active:border-black transition-all">
                    { isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                      <Pause className="size-7 text-black" />
                    ) : (
                      <Play className="size-7 text-black" />
                    ) }
                  </Button>
                </div>

                {/* Table Section */}
                <div className="grid grid-cols-[4px_4fr_2fr_1fr] gap-4 px-2 py-2 mt-6 
                text-sm text-zinc-400 bg-zinc-800 border-b border-white/40">
                  <div>#</div>
                  <div>Title</div>
                  <div>Released Date</div>
                  <div>
                    <Clock className="size-4" />
                  </div>
                </div>

                {/* Songs */}
                <div className="px-2">
                  <div className="space-y-2 py-4">
                    { currentAlbum?.songs.map((song, index) => {
                      const isCurrentSong = currentSong?._id === song._id;
                      return(
                      <div key={song._id} onClick={() => handlePlaySong(index)} className="grid grid-cols-[4px_4fr_2fr_1fr] gap-2 py-2 text-sm
                      text-zinc-400 active:bg-zinc-800 active:border-1 active:border-white rounded-md group">

                        <div className="flex items-center justify-center">
                          { isCurrentSong && isPlaying ? (
                            <span className="size-4 text-green-500">♫</span>
                          ) : (
                            <span className="group-active:hidden">{ index + 1 }</span>
                          ) }
                          {/* Add When Song is Playing */}
                          { !isCurrentSong && (<Play className="size-4 hidden group-active:block" />) }
                        </div>

                        <div className="flex items-center gap-3">
                          <img src={song.imageUrl} alt={song.title} className="size-10 rounded-lg" />
                          <div>
                            <div className="font-medium text-white">{song.title}</div>
                              <div>{song.artist}</div>
                            </div>
                        </div>

                        <div className="flex items-center">
                          { song.createdAt.split("T")[0] }
                        </div>

                        <div className="flex items-center">
                          { formatTime(song.duration) }
                        </div>

                      </div>
                      )
                    }
                  )}
                  </div>
                </div>
            </div>
          </div>
        </ScrollArea>
    </div>   
    );
    // For Big screen
  } else {
      return (
        <div className="h-full">
            <ScrollArea className="h-full rounded-lg">
              <div className="relative min-h-screen">
                {/* Background Color */}
              <div aria-hidden="true"  style={gradientStyle}
             className="absolute inset-0 pointer-events-none z-0"/>

                {/* Content */}
                <div className="relative z-10">
                  {/* Album Header */}
                  <div className="flex p-8 gap-4 pb-8 justify-center">
                    <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title}
                    className="size-40 shadow-lg object-co
                    ver rounded-full" />
                    {/* Text things */}
                    <div className="flex flex-col justify-end">
                      <p className="text-sm font-medium">
                        Album
                      </p>
                      <h2 className="text-7xl font-bold my-4">
                        { currentAlbum?.title }
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-white">
                        <span className="font-medium text-white">
                          • { currentAlbum?.songs.length } songs
                        </span>
                        <span className="font-medium text-white">
                          • { currentAlbum?.releaseYear }
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Play Button */}
                    <div className="px-6 pb-4 flex items-center gap-6">
                      <Button onClick={handlePlayAlbum} size="icon" className="size-12 rounded-full bg-green-500 active:bg-green-300 
                      active:scale-110 active:border-4 active:border-black transition-all">
                        { isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                          <Pause className="size-7 text-black" />
                        ) : (
                          <Play className="size-7 text-black" />
                        ) }
                      </Button>
                    </div>

                    {/* Table Section */}
                    <div className="grid grid-cols-[16px_3fr_2fr_1fr] gap-4 px-10 py-2 
                    text-sm text-white/80 bg-zinc-800 border-b-2 border-t-2 border-green-500">
                      <div>#</div>
                      <div>Title</div>
                      <div>Released Date</div>
                      <div>
                        <Clock className="size-4" />
                      </div>
                    </div>

                    {/* Songs */}
                    <div className="px-6">
                      <div className="space-y-2 py-4">
                    { currentAlbum?.songs.map((song, index) => {
                      const isCurrentSong = currentSong?._id === song._id;
                      return(
                      <div key={song._id} onClick={() => handlePlaySong(index)} className="grid grid-cols-[4px_4fr_2fr_1fr] gap-2 py-2 text-sm
                      text-zinc-400 active:bg-zinc-800 hover:bg-zinc-800 cursor-pointer hover:border-white border-b-2 active:border-white rounded-md group">

                        <div className="flex items-center justify-center">
                          { isCurrentSong && isPlaying ? (
                            <span className="size-4 text-green-500">♫</span>
                          ) : (
                            <span className="group-active:hidden">{ index + 1 }</span>
                          ) }
                          {/* Add When Song is Playing */}
                          { !isCurrentSong && (<Play className="size-4 hidden group-active:block" />) }
                        </div>

                            <div className="flex items-center gap-3">
                              <img src={song.imageUrl} alt={song.title} className="size-10 rounded-lg" />
                              <div>
                                <div className="font-medium text-white group-hover:text-green-500">{song.title}</div>
                                  <div className="group-hover:text-white">{song.artist}</div>
                                </div>
                            </div>

                            <div className="flex items-center group-hover:text-white">
                              { song.createdAt.split("T")[0] }
                            </div>

                            <div className="flex items-center group-hover:text-white">
                              { formatTime(song.duration) }
                            </div>
                          </div>
                        )
                    }
                  )}
                      </div>
                    </div>
                </div>
              </div>
            </ScrollArea>
        </div>
      );
  }



}

export default AlbumPage;
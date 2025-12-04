
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { albumStore } from "@/stores/albumStore";
import { Clock, Play } from "lucide-react";
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

    useEffect(() => {
      if(albumId) {
        fetchAlbumById(albumId)
      }
    },[fetchAlbumById, albumId]);

    console.log(currentAlbum)


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
      rgb(0,0,0) 90%
    )`
  };

  if(isMobile) {
    return (
    <div className="h-full">
        <ScrollArea className="h-full">
          <div className="relative min-h-screen">
            {/* Background Color */}
           <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={gradientStyle}
      />

            {/* Content */}
            <div className="relative z-10">
              {/* Album Header */}
              <div className="flex p-4 gap-6 pb-8 justify-center">
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
                  <div className="flex items-center gap-2 text-sm text-zinc-200">
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
                  <Button size="icon" className="size-14 rounded-full bg-green-500 hover:bg-green-400 
                   hover:scale-110 hover:border-4 hover:border-black transition-all cursor-pointer">
                    <Play className="size-7 text-black" />
                  </Button>
                </div>

                {/* Table Section */}
                <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 
                text-sm text-zinc-400 border-b border-white/40">
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
                    {currentAlbum?.songs.map((song, index) => (
                      <div key={song._id} className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm
                      text-zinc-400 hover:bg-white/40 hover:border-2 hover:border-black rounded-md group cursor-pointer">

                        <div className="flex items-center justify-center">
                          <span className="group-hover:hidden">{ index + 1 }</span>
                          <Play className="h-4 w-4 hidden group-hover:block" />
                        </div>

                        <div className="flex items-center gap-3">
                          <img src={song.imageUrl} alt={song.title} className="size-10" />
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
                    ))}
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
            <ScrollArea className="h-full">
              <div className="relative min-h-screen">
                {/* Background Color */}
              <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-0"
            style={gradientStyle}
          />

                {/* Content */}
                <div className="relative z-10">
                  {/* Album Header */}
                  <div className="flex p-4 gap-6 pb-8 justify-center">
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
                      <div className="flex items-center gap-2 text-sm text-zinc-200">
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
                      <Button size="icon" className="size-14 rounded-full bg-green-500 hover:bg-green-400 
                      hover:scale-110 hover:border-4 hover:border-black transition-all cursor-pointer">
                        <Play className="size-7 text-black" />
                      </Button>
                    </div>

                    {/* Table Section */}
                    <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 
                    text-sm text-zinc-400 bg-zinc-800 border-b border-white/40">
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
                        {currentAlbum?.songs.map((song, index) => (
                          <div key={song._id} className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm
                          text-zinc-400 hover:bg-zinc-800 hover:border-1 hover:border-white rounded-md group cursor-pointer">

                            <div className="flex items-center justify-center">
                              <span className="group-hover:hidden">{ index + 1 }</span>
                              <Play className="h-4 w-4 hidden group-hover:block" />
                            </div>

                            <div className="flex items-center gap-3">
                              <img src={song.imageUrl} alt={song.title} className="size-10" />
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
                        ))}
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
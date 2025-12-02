
import { ScrollArea } from "@/components/ui/scroll-area";
import { albumStore } from "@/stores/albumStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const AlbumPage = () => {
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
                                    r3: 0, g3: 0, b3:0 
                                  }); 
    useEffect(() => {
    const rand = () => Math.floor(Math.random() * 256);
    setColors({
      r1: rand(), g1: rand(), b1: rand(),
      r2: rand(), g2: rand(), b2: rand(),
      r3: rand(), g3: rand(), b3: rand()
    });
  }, []);
  const gradientStyle = {
    background: `linear-gradient(
      to bottom,
      rgb(${colors.r2}, ${colors.g2}, ${colors.b2}) 10%,
      rgb(${colors.r3}, ${colors.g3}, ${colors.b3}) 30%,
      rgb(0,0,0) 100%
    )`
  };


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
                className="size-40 shadow-lg object-cover rounded-full" />
                
              </div>

            </div>
          </div>
        </ScrollArea>
    </div>
  )
}

export default AlbumPage;
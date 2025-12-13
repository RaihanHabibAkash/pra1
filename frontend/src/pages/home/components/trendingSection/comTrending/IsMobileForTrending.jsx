import MadeForYouSectionSkeleton from "@/components/skeletons/MadeForYouSectionSkeleton";
import { Button } from "@/components/ui/button";
import { musicStore } from "@/stores/musicStore";
import { useState } from "react";

const IsMobileForTrending = () => {
    const { isLoading, trendingSongs } = musicStore();
    
    // Songs array resizeing
    const notClickedSongs = trendingSongs.slice(0, 4);
    const forClickedSongs = [ ...trendingSongs, ...trendingSongs ];
    const clickedSongs = forClickedSongs.slice(0, 20);
    const [ isClicked, setIsClicked ] = useState(false);
  if(!isClicked) {
    if(isLoading){
       return <MadeForYouSectionSkeleton />
    } else {
      return (
        <div className="mb-8"> 
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Trending
            </h2>
            <Button variant="link" onClick={ () => setIsClicked(true) } 
            className="cursor-pointer border-r-2 border-l-2 border-white/50 hover:text-white">
              See more
            </Button>
          </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    { notClickedSongs.map(song => (
                        <div key={ song._id } className="flex items-center bg-zinc-900 rounded-md overflow-hidden border-b-2 
                        hover:bg-zinc-700 active:bg-zinc-700 hover:border-green-500 active:border-green-500
                        transition-colors group cursor-pointer relative">
                            <img src={ song.imageUrl } title={ song.title } className="w-16 lg:w-20 h-16 md:h-20 
                            object-cover flex-shrink-0 rounded-lg" />
                            <div className="flex-1 p-4">
                                <p className="font-medium truncate text-white/80 group-hover:text-green-500 group-active:text-green-500 transition-colors">
                                    { song.title }
                                </p>
                                <p className="text-sm truncate text-white/50 group-hover:text-white group-active:text-white transition-colors">
                                    { song.artist }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
          
        </div>
      )
    } 
  } else {
  // If not Clicked
    if(isLoading){
       return <MadeForYouSectionSkeleton />
    } else {
      return (
        <div className="mb-8"> 
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Trending
            </h2>
            <Button variant="link" onClick={ () => setIsClicked(false) } 
            className="cursor-pointer border-r-2 border-l-2 border-white/50 hover:text-white">
              See less
            </Button>
          </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    { clickedSongs.map(song => (
                        <div key={ song._id } className="flex items-center bg-zinc-900 rounded-md overflow-hidden border-b-2 
                        hover:bg-zinc-700 active:bg-zinc-700 hover:border-green-500 active:border-green-500
                        transition-colors group cursor-pointer relative">
                            <img src={ song.imageUrl } title={ song.title } className="w-16 lg:w-20 h-16 md:h-20 
                            object-cover flex-shrink-0 rounded-lg" />
                            <div className="flex-1 p-4">
                                <p className="font-medium truncate text-white/80 group-hover:text-green-500 group-active:text-green-500 transition-colors">
                                    { song.title }
                                </p>
                                <p className="text-sm truncate text-white/50 group-hover:text-white group-active:text-white transition-colors">
                                    { song.artist }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
      )
    }   
  } 

}

export default IsMobileForTrending;

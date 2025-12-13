import MadeForYouSectionSkeleton from "@/components/skeletons/MadeForYouSectionSkeleton";
import { Button } from "@/components/ui/button";
import { musicStore } from "@/stores/musicStore";
import { useState } from "react";

const IsNotMobile = () => {
    const { isLoading, madeForYouSongs } = musicStore();
    
    // Songs array resizeing
    const notClickedSongs = madeForYouSongs.slice(0, 4);
    const forClickedSongs = [ ...madeForYouSongs, ...madeForYouSongs ];
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
              Made For You
            </h2>
            <Button variant="link" onClick={ () => setIsClicked(true) } 
            className="cursor-pointer border-r-2 border-l-2 border-white/50 hover:text-white">
              See more
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-8">
            { notClickedSongs.map(song => (
              <div key={ song._id } className="bg-zinc-600 p-4 rounded-md hover:bg-zinc-900 active:bg-zinc-900 
                transition-all group cursor-pointer group border-b-4 hover:border-green-500 active:border-green-500">
                <div className="relative mb-4 border-b-4">
                  <div className="aspect-square rounded-md h-40 sm:h-50 lg:h-full shadow-lg overflow-hidden">
                    <img src={ song.imageUrl } alt={song.title} className="transition-transform 
                    size-full object-cover duration-300 group-hover:scale-105 group-active:scale-105" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium truncate text-white/80 group-hover:text-green-500 group-active:text-green-500">
                    { song.title }
                  </h3>
                  <p className="text-sm truncate text-white/50 group-hover:text-white group-active:text-white">
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
              Made For You
            </h2>
            <Button variant="link" onClick={ () => setIsClicked(false) } 
            className="cursor-pointer border-r-2 border-l-2 border-white/50 hover:text-white">
              See more
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-8">
            { clickedSongs.map(song => (
              <div key={ song._id } className="bg-zinc-600 p-4 rounded-md hover:bg-zinc-900  active:bg-zinc-900
                transition-all group cursor-pointer group border-b-4 hover:border-green-500 active:border-green-500">
                <div className="relative mb-4 border-b-4">
                  <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                    <img src={ song.imageUrl } alt={song.title} className="transition-transform 
                    size-full object-cover duration-300 group-hover:scale-105 group-active:scale-105" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium truncate text-white/80 group-hover:text-green-500 group-active:text-green-500">
                    { song.title }
                  </h3>
                  <p className="text-sm truncate text-white/50 group-hover:text-white group-active:text-white">
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

export default IsNotMobile;

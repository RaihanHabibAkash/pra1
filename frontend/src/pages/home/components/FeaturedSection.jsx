import { FeaturedGridSkeleton } from "@/components/skeletons/FeaturedSectionSkeleton";
import { Button } from "@/components/ui/button";
import { musicStore } from "@/stores/musicStore"
import { useState } from "react";

const FeaturedSection = () => {
    // Data from zustand
    const { isLoading, featuredSongs } = musicStore();

    const songs = featuredSongs.slice(0, 9);
    const moreSongs = featuredSongs.slice(0, 18);
    const [ isClicked, setClicked ] = useState(false);
    if(!isClicked) {
        // If Loading
        if(isLoading) {
            return <FeaturedGridSkeleton />
        // If not Loading
        } else {
            return (
                <div className="mb-8">
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 lg:mb-8 font-bold">
                        Good Morning
                    </h2>
                    <Button variant="link" className="text-sm hover:text-white border-l-2 border-r-2
                     border-white/50 cursor-pointer"
                    onClick={() => setClicked(true)}>
                        See more
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    { songs.map(song => (
                        <div key={ song._id } className="flex items-center bg-zinc-900/50 rounded-md overflow-hidden border-b-2 
                        hover:bg-transparent active:bg-transparent hover:border-green-500 active:border-green-500
                        transition-colors group cursor-pointer relative">
                            <img src={ song.imageUrl } title={ song.title } className="w-16 lg:w-20 h-16 md:h-20 
                            object-cover flex-shrink-0 rounded-lg group-hover:scale-105 duration-300" />
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
    // If Clicked
    } else {
        if(isLoading) {
            // If Loading
            return <FeaturedGridSkeleton />
        // If not Loading
        } else {
            return (
                <div>
                <div className="flex flex-row items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 lg:mb-8">
                        Good Morning
                    </h2>
                    <Button variant="link" className="text-sm text-white border-l-2 border-r-2 border-white/50 cursor-pointer"
                    onClick={() => setClicked(false)}>
                        See less
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    { moreSongs.map(song => (
                            <div key={ song._id } className="flex items-center bg-zinc-900/50 rounded-md overflow-hidden border-b-2 
                            hover:bg-transparent active:bg-transparent hover:border-green-500 active:border-green-500
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

export default FeaturedSection

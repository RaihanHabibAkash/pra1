import { FeaturedGridSkeleton } from "@/components/skeletons/FeaturedSectionSkeleton";
import { musicStore } from "@/stores/musicStore"

const FeaturedSection = () => {
    const { isLoading, featuredSongs } = musicStore();

    if(isLoading) {
        return <FeaturedGridSkeleton />
    } else {
        return (
            <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 lg:mb-8">
                Good Morning
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                { featuredSongs.map(song => (
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

export default FeaturedSection

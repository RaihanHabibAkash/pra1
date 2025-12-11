import { FeaturedGridSkeleton } from "@/components/skeletons/FeaturedSectionSkeleton";
import { musicStore } from "@/stores/musicStore"

const FeaturedSection = () => {
    const { isLoading, featuredSongs } = musicStore();

    if(isLoading) {
        return <FeaturedGridSkeleton />
    } else {
        return (
            <div>
            <h2 className="text-2xl sm:text-3xl">
                Good Mornning
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                { featuredSongs.map(song => (
                    <div key={ song._id } className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 
                    transition-colors group cursor-pointer relative">
                        <img src={ song.imageUrl } title={ song.title } className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0" />
                        <div className="flex-1 p-4">
                            <p className="font-medium truncate">{ song.title }</p>
                            <p className="text-sm truncate">{ song.artist }</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        )
    }
}

export default FeaturedSection

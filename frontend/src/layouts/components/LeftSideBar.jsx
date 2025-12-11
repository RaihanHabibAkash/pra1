import PlayListSkeleton from "@/components/skeletons/PlayListSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { albumStore } from "@/stores/albumStore";
import { HomeIcon, LibraryIcon } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  const { isLoading, albums, fetchAlbums } = albumStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Nav Menu */}
      <div className="rounded-lg bg-zinc-800 p-4">
        <div className="space-y-2">
          <Link to={"/"} className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-full justify-start text-white bg-zinc-900 border-b-2 hover:border-green-500 hover:text-green-500"
            })
          )}>
            <HomeIcon className="size-6 mr-1" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link to={"/albums"} className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-full justify-start text-white bg-zinc-900 border-b-2 hover:border-green-500 hover:text-green-500"
            })
          )}>
            <LibraryIcon className="size-6 mr-1" />
            <span className="hidden md:inline">Library</span>
          </Link>
        </div>
      </div>
      
      {/* Library Sectioin */}
      <div className="flex-1 rounded-lg bg-zinc-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
              <LibraryIcon className="size-6 mr-1" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlayListSkeleton />
            ) : (
              albums.map(album => (
                <Link to={`/albums/${album._id}`} key={album._id} 
                className="p-2 hover:bg-zinc-900 rounded-md flex items-center gap-3 group cursor-pointer border-b-2
                hover:border-green-500">
                  <img src={album.imageUrl} alt={album.title} className="size-12 rounded-md flex-shrink-0 object-cover"/>
                    <p className="font-medium truncate flex-1 group-hover:text-green-500">
                      {album.title}
                    </p>
                </Link>
              ))
            )}
                   
          </div>
        </ScrollArea>

      </div>
        
    </div>
  )
}

export default LeftSideBar;

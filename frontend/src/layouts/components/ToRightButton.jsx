import PlayListSkeleton from "@/components/skeletons/PlayListSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { albumStore } from "@/stores/albumStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeft, ArrowRight, HomeIcon, LibraryIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isLoading, albums, fetchAlbums } = albumStore();
  useEffect(() => {
    fetchAlbums();
  },[fetchAlbums]);

  const [open, setOpen] = useState(false);

  return (
    // Components Start 
    <div className="h-full flex flex-1 items-center transition-all">

      {!open ? (
        // Condition 1 Start
        <ArrowRight onClick={ () => setOpen(true) }
          className="size-7 text-green-500 bg-zinc-700 rounded-md animate-bounce cursor-pointer fixed top-1/2 left-0"/>
        // Condition 1 Ends
      ) : (
        // Condition 2 Starts
        <div className="h-full w-screen flex flex-col gap-2">
          {/* Nav Start */}
          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="space-y-2">
              <Link to={"/"} className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-center text-white bg-zinc-700",
                  })
                )}>
                <HomeIcon className="size-6" />
                <span className="size-10 mb-auto">Home</span>
              </Link>

              <Link to={"/albums"} className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-center text-white bg-zinc-700",
                  })
                )}
              >
                <LibraryIcon className="size-6" />
                <span className="size-10 mb-auto">Library</span>
              </Link>
            </div>
          </div>
          {/* Nav End */}

          {/* Library Section Start */}
          <div className="flex flex-col flex-1 rounded-lg bg-zinc-800 p-4">
            <div className="flex mb-4 px-2 text-white">
              <LibraryIcon className="size-6 mr-1" />
              <span className="size-10">Playlists</span>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-2">
                {isLoading ? (
                  <PlayListSkeleton />
                ) : (
                  albums.map(album => (
                    <Link to={`/albums/${album._id}`} key={album._id} 
                    className="p-2 bg-zinc-900 rounded-md flex items-center gap-3 cursor-pointer">
                      <img src={album.imageUrl} alt={album.title} className="size-18 rounded-md flex-shrink-0 object-cover"/>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-green-500">
                          {album.title}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
                
              </div>
              <ArrowLeft onClick={ () => setOpen(false) }  
                className="size-7 text-green-500 bg-zinc-700 rounded-md animate-bounce cursor-pointer z-50 fixed top-1/2 right-0" />
            </ScrollArea>
          </div>
          {/* Library Section End */}
        </div>
        // Conditon 2 Ends
      )}

    </div>
    // Components Ends
  );
};

export default Sidebar;

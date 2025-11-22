import PlayListSkeleton from "@/components/skeletons/PlayListSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { HomeIcon, LibraryIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Nav Menu */}
      <div className="rounded-lg bg-zinc-800 p-4">
        <div className="space-y-2">
          <Link to={"/"} className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-full justify-start text-white hover:bg-zinc-800"
            })
          )}>
            <HomeIcon className="size-6 mr-1" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <Link to={"/albums"} className={cn(
            buttonVariants({
              variant: "ghost",
              className: "w-full justify-start text-white hover:bg-zinc-800"
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
            <PlayListSkeleton />       
          </div>
        </ScrollArea>

      </div>
        
    </div>
  )
}

export default LeftSideBar;

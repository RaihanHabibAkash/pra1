import PlayListSkeleton from "@/components/skeletons/PlayListSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowLeft, ArrowRight, HomeIcon, LibraryIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex flex-1 items-center transition-all">
      {/* Collapse Button */}
      {!open && (
        <ArrowRight
          className="size-7 text-green-500 bg-zinc-700 rounded-md animate-bounce cursor-pointer"
          onClick={() => setOpen(true)}
        />
      )}

      {/* Sidebar Content */}
      {open && (
        <div className="h-full flex flex-col gap-2 w-screen">
          {/* Navigation */}
          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="space-y-2">
              <Link
                to={"/"}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start text-white hover:bg-zinc-800",
                  })
                )}
              >
                <HomeIcon className="size-6 mr-1" />
                <span className="hidden md:inline">Home</span>
              </Link>

              <Link
                to={"/albums"}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start text-white hover:bg-zinc-800",
                  })
                )}
              >
                <LibraryIcon className="size-6 mr-1" />
                <span className="hidden md:inline">Library</span>
              </Link>
            </div>
          </div>

          {/* Library Section */}
          <div className="flex flex-col flex-1 rounded-lg bg-zinc-800 p-4">
            <div className="flex mb-4 px-2 text-white">
              <LibraryIcon className="size-6 mr-1" />
              <span className="hidden md:inline">Playlists</span>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-2">
                <PlayListSkeleton />
              </div>
              <ArrowLeft className="size-7 text-green-500 bg-zinc-700 rounded-md animate-bounce cursor-pointer z-50 fixed top-1/2 right-5" 
              onClick={() => setOpen(false)} />
            </ScrollArea>
          </div>

        </div>
      )}

    </div>
  );
};

export default Sidebar;

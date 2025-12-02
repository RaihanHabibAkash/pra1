import PlayListSkeleton from "@/components/skeletons/PlayListSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { albumStore } from "@/stores/albumStore";
import { ArrowLeft, ArrowRight, HomeIcon, LibraryIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { isLoading, albums, fetchAlbums } = albumStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <>
      {/* Open button */}
      {!open && (
        <ArrowRight
          onClick={() => setOpen(true)}
          className="size-7 text-green-500 bg-zinc-700 rounded-md animate-bounce cursor-pointer fixed top-1/2 left-0 z-50 md:hidden"/>)}

      {/* ---------- BACKDROP (mobile only) ---------- */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* ---------- SIDEBAR ---------- */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full z-50 bg-zinc-800 flex flex-col gap-6 p-4 transition-transform duration-300",
          "md:w-64", "w-full", open ? "translate-x-0" : "-translate-x-full"
        )}>

        {open && (
    <ArrowLeft onClick={() => setOpen(false)}
    className="size-7 text-green-500 bg-zinc-700 rounded-md animate-bounce cursor-pointer fixed top-1/2 right-0 z-50 md:hidden"/>)}

        {/* ---------- Navigation ---------- */}
        <div className="space-y-2">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-center text-white bg-zinc-700",
              })
            )}
          >
            <HomeIcon className="size-6 mr-1" />
            <span className="size-6">Home</span>
          </Link>

          <Link
            to="/albums"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-center text-white bg-zinc-700",
              })
            )}
          >
            <LibraryIcon className="size-6 mr-1" />
            <span className="size-6">Library</span>
          </Link>
        </div>

        {/* Playlist Section */}
        <div className="flex-1">
          <div className="flex items-center text-white px-2 mb-2">
            <LibraryIcon className="size-6 mr-1" />
            <span className="size-6">Playlists</span>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-2">
              
              {isLoading ? (
                <PlayListSkeleton />
              ) : (
                albums.map((album) => (
                  <Link to={`/albums/${album._id}`} key={album._id} onClick={() => setOpen(false)}
                    className="p-2 bg-zinc-900 flex items-center gap-3 group cursor-pointer rounded-md hover:bg-zinc-700 transition">
                    <img src={album.imageUrl} alt={album.title} className="size-12 object-cover rounded"/>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-green-500">
                        {album.title}
                      </p>
                    </div>
                  </Link>
                ))
              )}

            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

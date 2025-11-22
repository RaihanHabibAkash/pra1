
const PlayListSkeleton = () => {
  return Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="p-2 rounded-md flex items-center gap-4">
            <div className="size-12 bg-zinc-900 rounded-md shrink-0 animate-pulse" />

            <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-zinc-900 rounded-sm w-3/4 animate-pulse" />
                <div className="h-3 bg-zinc-900 rounded-sm w-1/2 animate-pulse" />
            </div>
        </div>
    ));

}

export default PlayListSkeleton;

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";
import ToRightButton from "./components/ToRightButton";
import { useEffect, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";

const MainLayout = () => {
    const [ isMobile, setIsMobile ] = useState(false);

    useEffect(() => {
        const checkSize = () => {
            window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
        }

        checkSize();

        window.addEventListener("resize", checkSize);
        return () => window.removeEventListener("resize", checkSize);
    }, []);

  return (
    <div className="h-screen text-white bg-black flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
            {/* Left Side */}

            { isMobile ? (
                <>
                    {/* Not visible */}
                    <AudioPlayer />
                    <ToRightButton />
                </>
                
            ) : (
                <>
                    <ResizablePanel id="left" order={1}  defaultSize={25} minSize={0} maxSize={35}>
                        {/* Not Visible */}
                        <AudioPlayer />
                        <LeftSideBar />
                    </ResizablePanel>

                    <ResizableHandle className="w-4 bg-black rounded-lg transition-colors" />
                </>
                
            ) }
                {/* Right Side */}
            <ResizablePanel id="right" order={2} defaultSize={isMobile ? 100 : 75}>
                <Outlet />
            </ResizablePanel>
        </ResizablePanelGroup>
        
        {/* Not done yet */}
        <PlaybackControls />
    </div>
  )
}

export default MainLayout;

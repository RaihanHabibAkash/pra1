import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSideBar from "./components/LeftSideBar";
import ToRightButton from "./components/ToRightButton";

const MainLayout = () => {
    const isMobile = false;
    if(isMobile){
        return(null)
    }
  return (
    <div className="h-screen text-white bg-black flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
            {/* Left Side */}

            { isMobile ? (
                <ToRightButton />
            ) : (
                <>
                    <ResizablePanel  defaultSize={25} minSize={0} maxSize={35}>
                        <LeftSideBar />
                    </ResizablePanel>

                    <ResizableHandle className="w-4 bg-black rounded-lg transition-colors" />
                </>
                
            ) }
            

                {/* Right Side */}
            <ResizablePanel defaultSize={isMobile ? 100 : 75}>
                <Outlet />
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout;

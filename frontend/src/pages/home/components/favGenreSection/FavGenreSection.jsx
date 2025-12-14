import { useEffect, useState } from "react";
import IsNotMobile from "./comMadeForYou/IsNotMobile";
import IsMobile from "./comMadeForYou/isMobile";

const FavGenreSection = () => {
  // For Checking the mobile
  const [ isMobile, setIsMobile ] = useState(false);
      useEffect(() => {
          const checkSize = () => {
              window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
          }
  
          checkSize();
  
          window.addEventListener("resize", checkSize);
          return () => window.removeEventListener("resize", checkSize);
      }, []);
    
  if(isMobile) {
    return <IsMobile />
  } else {
    return <IsNotMobile />
  }
   
}

export default FavGenreSection;

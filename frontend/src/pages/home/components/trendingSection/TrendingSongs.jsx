import { useEffect, useState } from "react";
import IsMobileForTrending from "./comTrending/IsMobileForTrending";
import IsNotMobileForTrending from "./comTrending/IsNotMobileForTrending";

const TrendingSongs = () => {
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
    return <IsMobileForTrending />
  } else {
    return <IsNotMobileForTrending />
  }
   
}

export default TrendingSongs;

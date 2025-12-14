import { useEffect, useState } from "react";
import IsMobileGenre from "./components/IsMobileGenre.jsx";
import IsNotMobileGenre from "./components/IsNotMobileGenre.jsx";


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
    return <IsMobileGenre />
  } else {
    return <IsNotMobileGenre />
  }
   
}

export default FavGenreSection;

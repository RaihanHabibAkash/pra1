import { useEffect, useState } from "react";
import IsMobileLanguage from "./components/IsMobileLanguage";
import IsNotMobileLanguage from "./components/IsNotMobileLanguage";



const FavLanguageSection = () => {
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
    return <IsMobileLanguage />
  } else {
    return <IsNotMobileLanguage />
  }
   
}

export default FavLanguageSection;

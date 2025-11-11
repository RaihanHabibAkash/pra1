import { Route, Routes } from "react-router-dom";
import AuthCallBackPage from "./pages/AuthCallBackPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {

  return (
   <>
    <Routes>
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback 
          signUpForceRedirectUrl={"/auth-callback"} />} />
      <Route path="/" element={<HomePage/>} />
      <Route path="/auth-call-back" element={<AuthCallBackPage/>} />
    </Routes>
   </>
  )
}

export default App

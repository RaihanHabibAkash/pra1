import { Route, Routes } from "react-router-dom";
import AuthCallBackPage from "./pages/auth_callback_page/AuthCallBackPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

function App() {

  return (
   <>
    <Routes>
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback 
          signUpForceRedirectUrl={"/auth-callback"} />} />
      <Route path="/" element={<HomePage/>} />
      <Route path="/auth/callback" element={<AuthCallBackPage/>} />
    </Routes>
   </>
  )
}

export default App;

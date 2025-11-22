import { Route, Routes } from "react-router-dom";
import AuthCallBackPage from "./pages/auth_callback_page/AuthCallBackPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layouts/MainLayout.jsx";

function App() {

  return (
   <>
    <Routes>
      <Route path="/sso-callback" element={<AuthenticateWithRedirectCallback 
          signUpForceRedirectUrl={"/auth-callback"} 
          signInForceRedirectUrl={"/auth-callback"} />} />
      
      <Route path="/auth-callback" element={ <AuthCallBackPage/> } />
      <Route element={ <MainLayout/> }>
        <Route path="/" element={<HomePage/>} />
      </Route>
    </Routes>
   </>
  )
}

export default App;

import { Route, Routes } from "react-router-dom";
import AuthCallBackPage from "./pages/authCallBackPage/AuthCallBackPage.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";

function App() {

  return (
   <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/auth-call-back" element={<AuthCallBackPage/>} />
    </Routes>
   </>
  )
}

export default App

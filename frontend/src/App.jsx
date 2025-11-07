import { Route, Routes } from "react-router-dom";

function App() {

  return (
   <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/auth-call-back" element={<AuthCallBack/>} />
    </Routes>
   </>
  )
}

export default App

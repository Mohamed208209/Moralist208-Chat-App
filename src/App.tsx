import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Login } from "./components/Login"

import { AuthProvider } from "./contexts/AuthContext"
import { Chats } from "./components/Chats"

function App() {
  
  return (
    <div>
     <BrowserRouter>
     <AuthProvider>

      <Routes>
      <Route path="/chats" element={<Chats/>} />
        <Route path="/" element={<Login/>} />
      </Routes>

      </AuthProvider>
     </BrowserRouter>
    </div>
      
 )
}

export default App

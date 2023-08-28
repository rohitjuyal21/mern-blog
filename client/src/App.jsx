import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Posts from "./components/Posts"
import Login from "./components/Login"
import Register from "./components/Register"
import{ Toaster } from 'react-hot-toast'
import Create from "./components/Create"

const App = () => {
  return (
    <div className="max-w-5xl m-auto text-gray-800">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
    </div>
  )
}

export default App

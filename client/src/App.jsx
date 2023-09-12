import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Posts from "./components/Posts"
import Login from "./components/Login"
import Register from "./components/Register"
import{ Toaster } from 'react-hot-toast'
import Create from "./components/Create"
import PostPage from "./components/PostPage"
import EditPost from "./components/EditPost"

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
        <Route path="post/:id" element={<PostPage />} />
        <Route path="edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
    </div>
  )
}

export default App

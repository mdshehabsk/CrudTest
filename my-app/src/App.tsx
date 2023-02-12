
import './App.css'
import { Routes,Route, useNavigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Index from './pages/index/Index'
import Navbar from './components/navbar/Navbar'
import Blog from './pages/blog/Blog'

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route element={<Index/>} path='/' />
        <Route element={<Blog/>} path='/blog/:id' />
        <Route element={<Login/>} path='/login' />
        <Route element={<Register/>} path='/register' />
      </Routes>
    </>
  )
}

export default App

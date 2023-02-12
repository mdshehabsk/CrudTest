import './login.css'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Axios from '../../interceptor/axiosInterceptor'
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate()
  useEffect(()=> {
    const token = localStorage.getItem('token')
    if(token){
      navigate('/')
    }
  },[])
  const [value,setValue] = useState({
    email:'',
    password:'',
  })
  function inputChange (e: any){
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }
   async function lgSubmit(e:any){
    try {
      e.preventDefault()
      const {data} = await Axios.post('auth/login',value)
      localStorage.setItem('token',JSON.stringify(data.token))
      toast.success(data.message)
      setTimeout(() => {
        navigate('/')
      }, 2000);
    navigate('/')
    } catch (error:any) {
     const err = error.response?.data?.message
       toast.error(err)
    }
      }
  const {email,password} = value
  return (
    <div className="login-page">
  <div className="form">
    <form className="login-form" onSubmit={lgSubmit} >
    <input type="text" placeholder="email address" name='email'  value={email} onChange={inputChange} />
        <input type="password" placeholder="password" name='password' value={password} onChange={inputChange} />
      <button>login</button>
      <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
    </form>
  </div>
  <Toaster />
</div>
  )
}

export default Login
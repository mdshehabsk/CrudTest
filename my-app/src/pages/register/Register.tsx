import './register.css'
import {Link,useNavigate} from 'react-router-dom'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

import Axios from '../../interceptor/axiosInterceptor';

const Register = () => {

   const navigate = useNavigate()
  const [value,setValue] = useState({
    username:'',
    email:'',
    password:'',
    cpassword:''
  })
  function inputChange (e:any) {
    setValue({
      ...value,
      [e.target.name]:e.target.value
    })
  }

  const rgSubmit = async (e:any) => {
    e.preventDefault()
    try {
      const {data}:any = await Axios.post('/auth/signup',value)
      toast.success(data.message)
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    } catch (error:any) {
      toast.error(error?.response?.data?.message)
    }

  }
  const {username,email,password,cpassword} = value
  return (
    <div className="register-page">
    <div className="form">
      <form className="register-form" onSubmit={rgSubmit} >
      <input type="text" placeholder="username" name='username'  value={username} onChange={inputChange} />
        <input type="text" placeholder="email address" name='email'  value={email} onChange={inputChange} />
        <input type="password" placeholder="password" name='password' value={password} onChange={inputChange} />
        <input type="password" placeholder="confirm password" name='cpassword' value={cpassword} onChange={inputChange} />
        <button>create</button>
        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
      </form>
    </div>
    <Toaster />
  </div>
  )
}

export default Register
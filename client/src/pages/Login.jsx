import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';

function Login() {
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignInData((prevData) => ({...prevData, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL+"/login", signInData);
      const data = await res.data;
      console.log(data);
      if(data.success){
        dispatch(login(data));
        setSignInData({ email: "", password: "" });
        toast.success(data.message);
        navigate(`/${data.role}/profile`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <section className='sign-up'>
      <div className="form-container">
        <h1>Let's Connect!</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' placeholder='your@gmail.com' value={signInData.email} onChange={handleChange}/>
          </div>

          <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' placeholder='Enter your password' value={signInData.password} onChange={handleChange}/>
          </div>

          <a href="#" className='pswd'>Forgot Password?</a>

          <div className='log'>
            <Link to={"/signup"}>Create Account</Link>
          </div>
          <button type='submit'>Login</button>  
        </form>
      </div>
    </section>
  )
}

export default Login;

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

function Signup() {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    email: "",
    accountType: "buyer"
  });
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setSignUpData((prevData) => ({...prevData, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(import.meta.env.VITE_API_URL+"/signup", signUpData);
      const data = await res.data;
      if(data.success){
        setSignUpData({
          username: "",
          password: "",
          email: "",
          accountType: ""
        });
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Internal Error");
    }
  }


  return (
    <section className='sign-up'>
      <div className="form-container">
        <h1>Let's Connect!</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label htmlFor="username">Username</label>
            <input type="text" name='username' id='username' placeholder='Username' value={signUpData.username} onChange={handleChange}/>
          </div>

          <div className='input-container'>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' placeholder='Enter your password' value={signUpData.password} onChange={handleChange}/>
          </div>

          <div className='input-container'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' placeholder='your@gmail.com' value={signUpData.email} onChange={handleChange}/>
          </div>

          <div className='input-container'>
            <label htmlFor="accountType">Select Your Account Type</label>
            <select id='accountType' name='accountType' value={signUpData.accountType} onChange={handleChange}>
              <option value="">--Select Account Type--</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <div className='log'>
            <Link to={"/login"}>Login with account</Link>
          </div>
          <button type='submit'>Sign up</button>
        </form>
      </div>
    </section>
  )
}

export default Signup;

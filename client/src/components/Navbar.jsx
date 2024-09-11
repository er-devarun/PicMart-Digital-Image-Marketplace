import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { login, logout } from '../store/slices/authSlice';
import { IoMenu } from "react-icons/io5";
import toast from 'react-hot-toast';
import { setTab } from '../store/slices/navSlice';

function Navbar() {
  const {pathname} = useLocation();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  async function handleRefreshToken(){
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL+"/refresh", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("refreshToken"),
        },
      })

      const data = res.data;
      dispatch(login(data));
    } catch (error) {
      dispatch(logout());
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefreshToken();
      // toast.success("Token Refreshed");
    }, 1000 * 60 * 15) //15 minute initerval

    return () => {
      // toast.error("Clean up function executed");
      clearInterval(interval);
    }
    
  }, []);

  return (
    <section className={`header ${pathname === "/seller/profile" || pathname === "/buyer/profile" ? "hidden" : ""}`}>
      <div>
        <div className='logo-container'>
          {/* <img src="/picprismlogo.png" alt="logo" style={{width: "50px"}}/> */}
          <Link to={"/"}>Pic<span><i>mart</i></span></Link>
          <span>Digital Image Marketplace</span>
        </div>
        <nav className={`nav-bar ${isActive ? "active" : ""}`}>
          <Link to={"/"}>About</Link>
          <Link to={"/"}>Contact</Link>
          {!isAuthenticated ? <><Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Sign Up</Link></> : <Link to={`/${role}/profile`} onClick={() => dispatch(setTab(role == "seller" ? "photos-management" : "photos-purchased"))}>Profile</Link>}
        </nav>
        <IoMenu className='header-menu' onClick={() => setIsActive(!isActive)}/>
      </div>
    </section>
  )
}

export default Navbar;

import React, { useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdPhotoLibrary } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { FaList } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../store/slices/navSlice";
import { login, logout } from "../store/slices/authSlice";
import { FaExchangeAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";


function DashboardSidebar() {
    const sideBar = useSelector(state => state.nav.sideBar);
    const tab = useSelector(state => state.nav.tab);
    const author = useSelector(state => state.auth.author);
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const role = useSelector(state => state.auth.role)

    useEffect(() => {
      dispatch(setTab(role === "seller" ? "photos-management" : "photos-purchased"));
    }, []);

    async function handleSwitchProfile(){
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL+"/switch", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        })

        const data = await res.data;
        console.log("switch profile = ", data);
        if(data.success){
          toast.success(data.message);
          dispatch(login(data));
          navigate(`/${data.role}/profile`);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  return (
    <div className={`side-bar ${sideBar ? "active" : ""}`}>
      <div className="user-pic-container">
        <div>
          <img src="https://github.com/mdo.png" alt="" />
          <span>@{author?.charAt(0).toUpperCase() + author?.slice(1)}</span>
        </div>
      </div>
      <hr />
      <div className="nav-item-container">
        <Link to={"/"} className={`nav-item ${tab === "home" ? "active" : ""}`} onClick={() => dispatch(setTab("home"))}>
          <IoHome /> Home
        </Link>

        {pathname === "/seller/profile" ? <li onClick={() => dispatch(setTab("photos-management"))} className={`nav-item ${tab === "photos-management" ? "active" : ""}`}>
          <MdPhotoLibrary /> Photos Management
        </li> : <li onClick={() => dispatch(setTab("photos-purchased"))} className={`nav-item ${tab === "photos-purchased" ? "active" : ""}`}>
          <MdPhotoLibrary /> Photos Purchased
        </li>}

        <li onClick={() => dispatch(setTab("analytics"))} className={`nav-item ${tab === "analytics" ? "active" : ""}`}>
          <SiGoogleanalytics /> Analytics
        </li>

        <li onClick={() => dispatch(setTab("orders"))} className={`nav-item ${tab === "orders" ? "active" : ""}`}>
          <FaList /> Orders
        </li>

        <li onClick={() => dispatch(setTab("favourites"))} className={`nav-item ${tab === "favourites" ? "active" : ""}`}>
          <FaHandHoldingHeart /> Favourites
        </li>

        <button onClick={handleSwitchProfile}className="switch-btn">Buyer <FaExchangeAlt /> Seller
        </button>
      </div>
      <hr />
      <li className="log-out" onClick={() => dispatch(logout())}>
        <MdLogout /> Logout
      </li>
    </div>
  );
}

export default DashboardSidebar;

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { toggleSideBar } from '../store/slices/navSlice';


function DashboardHeader() {
    const author = useSelector(state => state.auth.author);
    const sideBar = useSelector(state => state.nav.sideBar);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
  return (
    <div className='header-dashboard-wrapper'>
        <div className='header-dashboard'>
            <h1>Hello {author?.charAt(0).toUpperCase() + author?.slice(1)}</h1>
            <p>Welcome to your {role} dashboard</p>
        </div>
        {sideBar ? <IoClose className={`menu-icon close`} onClick={() => dispatch(toggleSideBar(!sideBar))}/> : <AiOutlineMenuUnfold className={`menu-icon`} onClick={() => dispatch(toggleSideBar(!sideBar))}/>}
    </div>
  )
}

export default DashboardHeader;

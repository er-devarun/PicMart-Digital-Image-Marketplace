import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import toast, {Toaster} from "react-hot-toast";
import gsap from "gsap";

function GsapTransition() {
    const nodeRef = useRef(null);
    const location = useLocation();
    
    useEffect(() => {
        if(nodeRef.current){
            gsap.fromTo(nodeRef.current, {opacity: 0}, {opacity: 1, duration:  1});
        }
    }, [location]);

  return (
    <div ref={nodeRef}>
        <Toaster/>
        <Outlet/>
    </div>
  )
}

export default GsapTransition;

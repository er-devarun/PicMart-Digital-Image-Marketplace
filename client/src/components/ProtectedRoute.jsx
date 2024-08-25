import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, isRequiresAuth }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth.role);
    const location = useLocation();

    if(isAuthenticated && (location.pathname == "/login" || location.pathname == "/signup")){
        return <Navigate to={`/${role}/profile`}/>
    }
    if(!isAuthenticated && isRequiresAuth){
        return <Navigate to={"/login"}/>
    }

    return children;
}

export default ProtectedRoute;

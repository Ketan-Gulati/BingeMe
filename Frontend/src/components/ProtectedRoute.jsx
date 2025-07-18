import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hidePopup, showPopup } from '../Redux/slice/popupSlice';
import { NavLink, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children})=>{
    const dispatch = useDispatch();
    const location = useLocation();
    const isAuthenticated = useSelector((state)=>state.auth.isLoggedIn);
    
    useEffect(()=>{
        if(!isAuthenticated){
            dispatch(showPopup());
        }
    },[isAuthenticated, dispatch]);

    if(!isAuthenticated){
        return <NavLink to="/" state={{from: location}} replace/>
    }
    
    return children;
}

export default ProtectedRoute
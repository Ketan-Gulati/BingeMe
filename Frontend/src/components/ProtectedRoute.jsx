import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hidePopup, showPopup } from '../Redux/slice/popupSlice';
import { NavLink, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children})=>{
    const dispatch = useDispatch();
    const location = useLocation();
    const isAuthenticated = useSelector((state)=>state.auth.isLoggedIn);
    const popup = useSelector((state)=>state.popup.isVisible);

    if(!isAuthenticated){
        dispatch(showPopup());
        return <NavLink to="/" state={{from: location}} replace/>
    }
    return children;
}

export default ProtectedRoute
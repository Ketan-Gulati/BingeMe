import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { hidePopup, showPopup } from '../Redux/slice/popupSlice';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, loading, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    // Hide popup when user is logged in
    if (isLoggedIn) {
      dispatch(hidePopup());
    }
  }, [isLoggedIn, dispatch]);

  // Show loading while auth is being initialized
  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect to home and show popup if not logged in
  if (!isLoggedIn) {
    dispatch(showPopup());
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
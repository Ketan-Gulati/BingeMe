import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser,logout } from '../Redux/slice/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Avatar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async()=>{
    try {
        await dispatch(logoutUser()).unwrap();
        dispatch(logout());
        navigate("/");
        window.location.reload();
    } catch (error) {
        console.error("Logout failed: ",error);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative w-[140px] h-[45px]" ref={dropdownRef}>
        {/* avatar button or icon */}
      <button
        className="flex items-center border border-[#5B5B5B] gap-2 py-2 px-5 rounded-3xl cursor-pointer hover:bg-[#2c2c2c]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src={user.avatar} alt={user.userName} className="w-8 h-8 rounded-full" />
        <p className="text-sm text-white font-semibold ">{user.userName}</p>
      </button>

        {/* dropdown menu  */}
        {/* added animation for dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"
          >
            <div className="px-4 py-2 text-gray-700 border-b border-gray-200">
              Hello, <strong>{user.fullName}</strong>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium cursor-pointer"
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Avatar;

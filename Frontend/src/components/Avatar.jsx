import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, logout } from '../Redux/slice/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

function Avatar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.theme);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(logout());
      navigate("/", { replace: true });
      window.location.reload();
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

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
    <div
      className={clsx(
        "relative",
        "w-full max-w-[140px] h-[45px] md:w-[140px]", // responsive avatar button container
      )}
      ref={dropdownRef}
    >
      {/* avatar button or icon */}
      <button
        className={clsx(
          "flex items-center gap-2 py-2 px-4 rounded-3xl cursor-pointer border w-full overflow-hidden",
          theme === 'dark'
            ? "border-[#5B5B5B] hover:bg-[#2c2c2c]"
            : "border-gray-300 hover:bg-gray-100"
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          src={user.avatar}
          alt={user.userName}
          className="w-8 h-8 rounded-full object-cover"
        />
        <p
          className={clsx(
            "text-sm font-semibold hidden md:block overflow-hidden text-ellipsis whitespace-nowrap max-w-[70px]",
            theme === 'dark' ? "text-white" : "text-black"
          )}
        >
          {user.userName}
        </p>
      </button>

      {/* dropdown menu */}
      {/* added animation for dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 5 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              "absolute right-0 mt-2 w-48 shadow-lg rounded-lg py-2 z-50",
              theme === 'dark' ? "bg-[#1e1e1e]" : "bg-white"
            )}
          >
            <div
              className={clsx(
                "px-4 py-2 border-b text-sm",
                theme === 'dark'
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-700 border-gray-200"
              )}
            >
              Hello, <strong>{user.fullName}</strong>
            </div>
            <button
              onClick={handleLogout}
              className={clsx(
                "w-full text-left px-4 py-2 font-medium cursor-pointer text-sm",
                theme === 'dark'
                  ? "hover:bg-[#2c2c2c] text-red-500"
                  : "hover:bg-gray-100 text-red-600"
              )}
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

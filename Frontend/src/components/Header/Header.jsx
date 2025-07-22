import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentUser } from '../../Redux/slice/authSlice';
import Avatar from '../Avatar';
import SignInBox from '../SignInBox';
import { toggleCompact, toggleMobile } from '../../Redux/slice/hamburgerSlice';
import { IoSearch } from "react-icons/io5";
import clsx from 'clsx';
import { hidePopup, showPopup } from '../../Redux/slice/popupSlice';
import Popup from '../Popup';
import { fetchVideos } from '../../Redux/slice/videoSlice';

function Header() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isLoggedIn } = useSelector((state) => state.auth);
  const popup = useSelector((state) => state.popup.isVisible);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleHamburgerClick = () => {
    if (window.innerWidth >= 1024) {
      dispatch(toggleCompact());
    } else {
      dispatch(toggleMobile());
    }
  };

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      dispatch(showPopup());
    }
  };

  const handleSearch = () => {
    // Only search if there's a query or reset to show all videos
    dispatch(fetchVideos({ 
      searchQuery: searchQuery.trim()
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <header className={clsx(
      'w-full shadow sticky top-0 z-50',
      theme === 'dark' ? 'bg-[#121212]' : 'bg-white'
    )}>
      {popup && (
        <Popup onClose={() => {
          dispatch(hidePopup());
          navigate("/", {replace:true});
        }} />
      )}

      <nav className='px-4 lg:px-6 py-2.5 w-full'>
        <div className="flex justify-between items-center w-full">
          {/* Left section - hamburger and logo */}
          <div className='flex items-center gap-4'>
            <button 
              onClick={handleHamburgerClick} 
              className='cursor-pointer'
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className={clsx(
                  'size-8',
                  theme === 'dark' ? 'text-white' : 'text-gray-700'
                )}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <Link 
              to="/" 
              className="flex items-center"
              onClick={handleClick}
            >
              {theme === 'dark'?  
                <img 
                  src='/BingeMe.png' 
                  className='mt-2 mr-3 h-12' 
                  alt="BingeMe Logo" 
                /> : 
                <img 
                  src='/BingeMe2.png' 
                  className='mt-2 mr-3 h-12' 
                  alt="BingeMe Logo" 
                />
                }
            </Link>
          </div>

          {/* Middle section - search bar */}
          <div className='hidden sm:flex items-center w-full max-w-xl mx-4'>    
            <div className={clsx(
              'flex-grow rounded-l-full overflow-hidden border',
              theme === 'dark' ? 'border-gray-700 bg-[#222]' : 'border-gray-200 bg-gray-100'
            )}>
              <input
                placeholder='Search'
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className={clsx(
                  'w-full py-2 px-5 focus:outline-none',
                  theme === 'dark' ? 'text-white bg-transparent' : 'text-gray-900'
                )}
              />
            </div>
            <button
              onClick={handleSearch}
              className={clsx(
                'rounded-r-full px-5 py-2 flex items-center justify-center',
                theme === 'dark' ? 'bg-[#333] hover:bg-[#444] border-gray-700' : 'bg-gray-200 hover:bg-gray-300 border-gray-200',
                'border border-l-0'
              )}
              aria-label="Search"
            >
              <IoSearch className={clsx(
                'size-6',
                theme === 'dark' ? 'text-white' : 'text-gray-700'
              )} />
            </button>
          </div>

          {/* Right section - profile/sign-in */}
          <div>
            {loading ? null : isLoggedIn ? (
              <Avatar />
            ) : (
              <SignInBox />
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className='flex sm:hidden mt-3'>
          <div className={clsx(
            'flex-grow rounded-l-full overflow-hidden border',
            theme === 'dark' ? 'border-gray-700 bg-[#222]' : 'border-gray-200 bg-gray-100'
          )}>
            <input
              placeholder='Search'
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={clsx(
                'w-full py-2 px-4 focus:outline-none',
                theme === 'dark' ? 'text-white bg-transparent' : 'text-gray-900'
              )}
            />
          </div>
          <button
            onClick={handleSearch}
            className={clsx(
              'rounded-r-full px-4 py-2 flex items-center justify-center',
              theme === 'dark' ? 'bg-[#333] hover:bg-[#444] border-gray-700' : 'bg-gray-200 hover:bg-gray-300 border-gray-200',
              'border border-l-0'
            )}
            aria-label="Search"
          >
            <IoSearch className={clsx(
              'size-6',
              theme === 'dark' ? 'text-white' : 'text-gray-700'
            )} />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
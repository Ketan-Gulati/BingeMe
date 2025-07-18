import React, { useEffect, useState } from 'react'
import {Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { fetchCurrentUser } from '../../Redux/slice/authSlice';
import Avatar from '../Avatar';
import SignInBox from '../SignInBox';

function Header() {

  const dispatch = useDispatch();
  const {loading, isLoggedIn} = useSelector((state)=>state.auth)

  useEffect(()=>{                             //because when the page loads, we don't know whether user is logged in or not so we check via api call
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className='w-full shadow sticky top-0 z-50'>
        <nav className='bg-[#121212] px-4 lg:px-6 py-2.5 w-full'>
            <div className="flex justify-between items-center w-full">
                {/* section for hamburger and logo */}
                <div className='flex items-center gap-4'>
                  <button className='cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                  </button>
   
                  <Link to="/" className="flex items-center">
                    <img src='/BingeMe.png' className='mt-2 mr-3 h-12' alt="Logo"></img>
                  </Link>
                </div>

                {/* section for search bar */}
                <div className='flex items-center w-full max-w-xl mx-auto'> {/* Added w-full max-w-xl mx-auto for common central alignment and width */}
                  {/* The input container. flex-grow makes it take available space. */}
                  <div className='flex-grow border border-gray-600 rounded-l-full overflow-hidden'> {/* Changed border color and added rounded-l-full */}
                    <input
                      placeholder='Search'
                      type='text'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      // Standard input styling: full width, padding, text color, transparent background, no default focus outline
                      className='w-full py-2 px-5 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500' // Added focus ring for better UX
                    />
                  </div>
                  {/* The search button container. */}
                  <div
                    className='bg-gray-700 hover:bg-gray-600 border border-l-0 border-gray-600 rounded-r-full px-5 py-2 cursor-pointer flex items-center justify-center' // Changed background/border colors, added hover, flex alignment
                    onClick={(e) => setSearchQuery(e.target.value)} // Remember to update this to your actual search trigger
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                </div>
                
                {/* section for profile/sign-in block */}
                <div>
                  {loading ? null : isLoggedIn? <Avatar/> : <SignInBox/> }
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header

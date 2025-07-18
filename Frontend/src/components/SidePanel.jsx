import { IoMdHome } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiHistoryLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { HiPencilSquare } from "react-icons/hi2";
import { CgPlayList } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { NavLink, useNavigate } from 'react-router-dom';
import { MdSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup.jsx";
import { hidePopup, showPopup } from "../Redux/slice/popupSlice.js";
import clsx from 'clsx'; // Import clsx

function SidePanel() {

    const navigate = useNavigate();

    const isAuthenticated = useSelector((state)=>state.auth.isLoggedIn);

    const dispatch = useDispatch();
    const popup = useSelector((state)=>state.popup.isVisible)

    const handleClick =(featurePath)=>(e)=>{
            // e.preventDefault();
            if(!isAuthenticated){
                dispatch(showPopup());
            }
            else{
                dispatch(hidePopup());
                // navigate(featurePath); // You might want to uncomment this if you intend to navigate on successful authentication
            }
    }

  return (
    <div>
        {popup && (
            <Popup onClose={() => {
                dispatch(hidePopup());
                navigate("/");      // so that when we close the popup we are navigated to home page and not stay at any other page
            }} />
        )}       

        <div className='h-full w-70  shadow sticky z-40 bg-[#121212] flex flex-col'>

            {/* upper section of side panel */}
            <section className='px-6 py-2 flex flex-col gap-6 flex-1 overflow-y-auto'>
                {/* home is public route so no need for running handleClick() for it*/}
                <NavLink to='/Home' className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <IoMdHome className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Home</span>
                    </div>
                </NavLink>
                <NavLink  to='/my-channel' onClick={handleClick('/my-channel')} className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <RiAccountCircleFill className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>My Channel</span>
                    </div>
                </NavLink>
                <NavLink to='/watch-history' onClick={handleClick('/watch-history')} className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <RiHistoryLine className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Watch History</span>
                    </div>
                </NavLink>
                <NavLink to='/community-posts' onClick={handleClick('/community-posts')} className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <AiFillMessage className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Community Posts</span>
                    </div>
                </NavLink>
                <NavLink to='/my-comments' onClick={handleClick('/my-comments')} className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <HiPencilSquare className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>My Comments</span>
                    </div>
                </NavLink>
                <NavLink to='/playlists' onClick={handleClick('/playlists')} className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <CgPlayList  className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Playlists</span>
                    </div>
                </NavLink>
                <NavLink to='/dashboard' onClick={handleClick('/dashboard')} className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <MdDashboard  className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Dashboard</span>
                    </div>
                </NavLink>
                <NavLink to='/upload-video' onClick={handleClick('/upload-video')} className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <TbUpload  className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Upload Video</span>
                    </div>
                </NavLink>
            </section>

            {/* lower section of side panel */}
            <section className='px-6 py-2 flex flex-col gap-6'>
                <NavLink to='/settings' onClick={handleClick('/settings')} className={({isActive})=>
                    clsx(
                        'duration-200 border-b border-gray-500 lg:border-0',
                        isActive ? 'text-gray-300' : 'text-gray-500'
                    )
                } end>
                    <div className='flex items-center gap-6 cursor-pointer'>
                        <MdSettings  className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Settings</span>
                    </div>
                </NavLink>
                <div>
                    <label className="relative inline-flex items-center">
                        <input value="" type="checkbox" className="sr-only peer onChange={} checked:{} "/>
                        <div className=" cursor-pointer w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-white">
                            Switch to light mode
                        </span>
                    </label>

                </div>

            </section>
        </div>
    </div>
  )
}

export default SidePanel
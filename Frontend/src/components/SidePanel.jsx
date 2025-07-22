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
import clsx from 'clsx';
import { toggleTheme } from "../Redux/slice/themeSlice.js";

function SidePanel() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const popup = useSelector((state) => state.popup.isVisible);
    const theme = useSelector((state) => state.theme.theme);

    const handleClick = (featurePath) => (e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            dispatch(showPopup());
        } else {
            dispatch(hidePopup());
        }
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <div>
            {popup && (
                <Popup onClose={() => {
                    dispatch(hidePopup());
                    navigate("/");
                }} />
            )}

            <div className={clsx(
                'h-full w-70 shadow sticky z-40 flex flex-col',
                theme === 'dark' ? 'bg-[#121212]' : 'bg-white border-r border-gray-200'
            )}>

                {/* Upper section of side panel */}
                <section className='px-6 py-2 flex flex-col gap-6 flex-1 overflow-y-auto'>
                    <NavLink 
                        to='/Home' 
                        className={({ isActive }) =>
                            clsx(
                                'duration-200 border-b lg:border-0 py-2',
                                isActive 
                                    ? theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-600',
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )
                        } 
                        end
                    >
                        <div className='flex items-center gap-6 cursor-pointer'>
                            <IoMdHome className={clsx('size-6', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
                            <span className='font-medium text-[14px]'>Home</span>
                        </div>
                    </NavLink>

                    <NavLink 
                        to='/my-channel' 
                        onClick={handleClick('/my-channel')} 
                        className={({ isActive }) =>
                            clsx(
                                'duration-200 border-b lg:border-0 py-2',
                                isActive 
                                    ? theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-600',
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )
                        } 
                        end
                    >
                        <div className='flex items-center gap-6 cursor-pointer'>
                            <RiAccountCircleFill className={clsx('size-6', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
                            <span className='font-medium text-[14px]'>My Channel</span>
                        </div>
                    </NavLink>

                    <NavLink 
                        to='/watch-history' 
                        onClick={handleClick('/watch-history')} 
                        className={({ isActive }) =>
                            clsx(
                                'duration-200 border-b lg:border-0 py-2',
                                isActive 
                                    ? theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-600',
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )
                        } 
                        end
                    >
                        <div className='flex items-center gap-6 cursor-pointer'>
                            <RiHistoryLine className={clsx('size-6', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
                            <span className='font-medium text-[14px]'>Watch History</span>
                        </div>
                    </NavLink>

                    <NavLink 
                        to='/community-posts' 
                        onClick={handleClick('/community-posts')} 
                        className={({ isActive }) =>
                            clsx(
                                'duration-200 border-b lg:border-0 py-2',
                                isActive 
                                    ? theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-600',
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )
                        } 
                        end
                    >
                        <div className='flex items-center gap-6 cursor-pointer'>
                            <AiFillMessage className={clsx('size-6', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
                            <span className='font-medium text-[14px]'>Community Posts</span>
                        </div>
                    </NavLink>

                    <NavLink 
                        to='/my-comments' 
                        onClick={handleClick('/my-comments')} 
                        className={({ isActive }) =>
                            clsx(
                                'duration-200 border-b lg:border-0 py-2',
                                isActive 
                                    ? theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-600',
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )
                        } 
                        end
                    >
                        <div className='flex items-center gap-6 cursor-pointer'>
                            <HiPencilSquare className={clsx('size-6', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
                            <span className='font-medium text-[14px]'>My Comments</span>
                        </div>
                    </NavLink>

                    <NavLink 
                        to='/playlists' 
                        onClick={handleClick('/playlists')} 
                        className={({ isActive }) =>
                            clsx(
                                'duration-200 border-b lg:border-0 py-2',
                                isActive 
                                    ? theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-600',
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )
                        } 
                        end
                    >
                        <div className='flex items-center gap-6 cursor-pointer'>
                            <CgPlayList className={clsx('size-6', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
                            <span className='font-medium text-[14px]'>Playlists</span>
                        </div>
                    </NavLink>

                    <NavLink 
                        to='/upload-video' 
                        onClick={handleClick('/upload-video')} 
                        className={({ isActive }) =>
                            clsx(
                                'duration-200 border-b lg:border-0 py-2',
                                isActive 
                                    ? theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-600',
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )
                        } 
                        end
                    >
                        <div className='flex items-center gap-6 cursor-pointer'>
                            <TbUpload className={clsx('size-6', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
                            <span className='font-medium text-[14px]'>Upload Video</span>
                        </div>
                    </NavLink>
                </section>

                {/* Lower section of side panel */}
                <section className='px-6 py-2 flex flex-col gap-6'>
                    <NavLink 
                        to='/settings' 
                        onClick={handleClick('/settings')} 
                        className={({ isActive }) =>
                            clsx(
                                'duration-200 border-b lg:border-0 py-2',
                                isActive 
                                    ? theme === 'dark' ? 'text-gray-300' : 'text-blue-700'
                                    : theme === 'dark' ? 'text-gray-500' : 'text-gray-600',
                                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                            )
                        } 
                        end
                    >
                        <div className='flex items-center gap-6 cursor-pointer'>
                            <MdSettings className={clsx('size-6', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
                            <span className='font-medium text-[14px]'>Settings</span>
                        </div>
                    </NavLink>

                    <div className="flex items-center justify-between pb-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={theme === 'light'}
                                onChange={handleThemeToggle}
                            />
                            <div className={clsx(
                                "w-11 h-6 peer-focus:outline-none rounded-full peer",
                                theme === 'dark' ? "bg-gray-700" : "bg-gray-200",
                                "peer-checked:after:translate-x-full peer-checked:after:border-white",
                                "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
                                "after:bg-white after:border after:rounded-full after:h-5 after:w-5",
                                "after:transition-all peer-checked:bg-blue-600",
                                theme === 'dark' ? "after:border-gray-600" : "after:border-gray-300"
                            )}></div>
                            <span className={clsx(
                                "ml-3 text-sm font-medium",
                                theme === 'dark' ? "text-white" : "text-gray-900"
                            )}>
                                {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                            </span>
                        </label>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SidePanel;
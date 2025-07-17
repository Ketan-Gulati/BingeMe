import { IoMdHome } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiHistoryLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { HiPencilSquare } from "react-icons/hi2";
import { CgPlayList } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { TbUpload } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { MdSettings } from "react-icons/md";

function SidePanel() {

  return (
    <div>
        <div className='h-full w-70  shadow sticky z-40 bg-[#121212] flex flex-col'>

            {/* upper section of side panel */}
            <section className='px-6 py-2 flex flex-col gap-6 flex-1 overflow-y-auto'>
                <NavLink className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <IoMdHome className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Home</span>
                    </button>
                </NavLink>
                <NavLink  className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <RiAccountCircleFill className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>My Channel</span>
                    </button>
                </NavLink>
                <NavLink className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <RiHistoryLine className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Watch History</span>
                    </button>
                </NavLink>
                <NavLink className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <AiFillMessage className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Community Posts</span>
                    </button>
                </NavLink>
                <NavLink className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <HiPencilSquare className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>My Comments</span>
                    </button>
                </NavLink>
                <NavLink className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <CgPlayList  className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Playlists</span>
                    </button>
                </NavLink>
                <NavLink className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <MdDashboard  className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Dashboard</span>
                    </button>
                </NavLink>
                <NavLink className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <TbUpload  className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Upload Video</span>
                    </button>
                </NavLink>
            </section>

            {/* lower section of side panel */}
            <section className='px-6 py-2 flex flex-col gap-6'>
                <NavLink className={({isActive})=>`duration-200 border-b border-gray-500 lg:border-0 
                ${
                    isActive ? "text-gray-300" : "text-gray-500"
                }`}>
                    <button className='flex items-center gap-6 cursor-pointer'>
                        <MdSettings  className='text-white  size-8'/>
                        <span className='text-white font-medium text-[14px]'>Settings</span>
                    </button>
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

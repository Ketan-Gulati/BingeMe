import React from 'react'
import {Link, Navlink} from "react-router-dom"

function Header() {
  return (
    <header className='shadow sticky top-0 z-50'>
        <nav className='bg-[#5b5b5b] border-gray-200 px-4 lg:px-6 py-2.5'>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <Link to="/" className="flex items-center">
                    <img src='../../../public/BingeMe.png' className='mr-3 h-12' alt="Logo"></img>
                </Link>
            </div>
        </nav>
    </header>
  )
}

export default Header
import React from 'react'
import Header from '../components/header/Header'
import SidePanel from '../components/SidePanel'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <div className='flex flex-col h-screen'>
          <Header/>
          <div className='flex flex-1 overflow-hidden'>
            <SidePanel/>
            <main className='flex-1 overflow-y-auto bg-[#1E1E1E]'>
              <Outlet/>
            </main>
          </div>
        </div>
    </>
  )
}

export default Layout
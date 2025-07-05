import React from 'react'
import { Outlet } from 'react-router-dom'

function Auth() {
  return (
    <div className='flex flex-row border gap-3'>
      <div className='w-screen h-screen flex-1/2 hidden lg:block'>
        <img src="/home.png" alt="logo" className='w-full h-full' />
      </div>
      <div className='flex-1/2 flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default Auth

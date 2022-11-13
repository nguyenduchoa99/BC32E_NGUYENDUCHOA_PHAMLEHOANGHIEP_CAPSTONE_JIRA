import React from 'react'
import { Outlet } from 'react-router-dom'
import MenuLayout from '../Menu/MenuLayout'
import './mainLayout.scss'
const MainLayout = () => {
  return (
    <div className='row'>
      <div className='menu-layout'>
        <MenuLayout />
      </div>
      <div className='main-layout'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
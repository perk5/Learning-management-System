import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import SideBar from '../../components/educator/SideBar'
import Footer from '../../components/educator/Footer'
import DashBoard from './DashBoard'

const Educator = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
      <Navbar />
      <div className='flex'>
        <SideBar />
        <div className='flex-1 flex-row'>
          { <Outlet /> }
        </div>    
      </div>
      
      <Footer />
    </div>
    )   
}

export default Educator

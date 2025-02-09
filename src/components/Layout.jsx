import React from 'react'
import Navigation from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'

const Layout = ({search, setSearch}) => {    
  return (
    <div className='layout'>
    <Navigation search={search} setSearch={setSearch}/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Layout
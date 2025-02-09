import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import './Header.css'
import logo from '../assets/logo.png'
import searchIcn from '../assets/search.png'
import menu from '../assets/menu.png'

const Navigation = ({search, setSearch}) => {
  const location = useLocation().pathname.split('/')
  
  const [path, setPath] = useState(location[1] ? location[1] : location[2])
  
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  
  return (
    <header>
      <div className="title-box">
        <img src={logo} alt="" className="logo" />
        <h1 className="site-name">Blogs</h1>
      </div>
      <nav className={navOpen ? "nav-bar nav-open" : "nav-bar"}>
        <ul>
          <li className="nav-item">
            <Link className={(path === "blogs") ? "nav-link active-link" : "nav-link"} to='/blogs' onClick={() => setPath("blogs")}>Home</Link>
          </li>
          <li className="nav-item">
            <NavLink className={(path === "post") ? "nav-link active-link" : "nav-link"} to='/blogs/post' onClick={() => setPath("post")}>Post</NavLink>
          </li>
          <li className="nav-item">
            <Link className={(path === "myblogs") ? "nav-link active-link" : "nav-link"} to='/blogs/myblogs' onClick={() => setPath("myblogs")}>MyBlogs</Link>
          </li>
          <li className="nav-item">
            <Link className={(path === "about") ? "nav-link active-link" : "nav-link"} to='/blogs/about' onClick={() => setPath("about")}>About</Link>
          </li>
          <li className="nav-item">
            <Link className={(path === "contact") ? "nav-link active-link" : "nav-link"} to='/blogs/contact' onClick={() => setPath("contact")}>Contact</Link>
          </li>
          <input type="text" name="search" id="search" className={(searchOpen)?"search open-search":"search"} placeholder='search' onChange={e => setSearch(e.target.value)} value={search}/>
          <img src={searchIcn} alt="" className="search-btn" onClick={() => setSearchOpen(!searchOpen)}/>
        </ul>
      </nav>
      <img src={menu} alt="" className="menu-btn"  onClick={() => setNavOpen(!navOpen)}/>

    </header>
  )
}

export default Navigation
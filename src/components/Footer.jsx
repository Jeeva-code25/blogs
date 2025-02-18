import React from 'react'
import './Footer.css'
import logo from '../assets/logo.png'
import facebook from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import linkedin from '../assets/linkedin.png'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <footer>
       <div className="title-box">
        <img src={logo} alt="" className="logo" />
        <h1 className="site-name">Blogs</h1>
      </div>

      <nav className={"footer-nav-bar"}>
        <ul>
          <li className="nav-item">
            <Link className={"nav-link"} to='/blogs'>Home</Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link"} to='/blogs/post'>Post</Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link"} to='/blogs/about'>About</Link>
          </li>
          <li className="nav-item">
            <Link className={"nav-link"} to='/blogs/contact'>Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="social-box">
      <a href="https://www.facebook.com/profile.php?id=100022738261586" target='_blank'><img src={facebook} alt="" className="social-btn" /></a>
      <a href="https://www.instagram.com/jeevananthan_k/" target='_blank'><img src={instagram} alt="" className="social-btn" /></a>
      <a href="https://www.linkedin.com/in/jeevananthan-kumar-77a931317" target='_blank'><img src={linkedin} alt="" className="social-btn" /></a>
      </div>
      <div className="hor-divider"></div>
      <p className="copy-right">Copyright capcoder Inc © 2025. All Right Reserved</p>
    </footer>
  )
}

export default Footer
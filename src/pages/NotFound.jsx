import React from 'react'
import './NotFound.css'
import { useNavigate } from 'react-router'
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <main className='not-found-container'>
        <div className="not-found-box">
          <h1 className="not-found">404</h1>
          <p className="sry">Sorry!</p>
          <p className="sry">The link is broken, try to refresh or go to home</p>
          <button className="go-home" onClick={() => navigate('/users/login')}>Go To Login</button>
        </div>
    </main>
  )
}

export default NotFound
import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'
import { registerUser } from '../features/user/loginSlice'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const cPasswordRef = useRef(null)
  const { registerInfo, loading, error } = useSelector(state => state.login)  
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [cPassword, setCPassword] = useState('')
  const [cpasswordError, setCPasswordError] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  useEffect(() => {
    if(registerInfo.lenght <= 0) usernameRef.current.focus()
  }, [])

  useEffect(() => {
    setUsernameError(username.trim().length <= 0)
    setPasswordError(password.trim().length < 8)
    setCPasswordError(password !== cPassword)
  }, [username, password, cPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameError && !cpasswordError) {
      const data = {
        username: username,
        password: cPassword,
      }
      try {
        dispatch(registerUser(data))
      } catch (err) {
        console.error(err.message);
      }

    }
  }

  const handleKeyDown = (e, ref) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      ref.current.focus()
    }
  }

  return (
    <div className='login-page'>
      <div className="login-box">
        <div className="login-title">
          <img src={logo} alt="" className="login-logo" />
          <h3 className="site-name">Registration</h3>
        </div>

        <form className="mt-2 user-form" onSubmit={handleSubmit}>

          {(registerInfo.length <= 0) &&
            <>
              <input type="text" name="username" id="username" placeholder='Username' className="username" onChange={e => setUsername(e.target.value)} value={username} ref={usernameRef} onKeyDown={(e) => handleKeyDown(e, passwordRef)} autoComplete='off' />
              {(usernameError) && <p className='error'>Username is required</p>}

              <input type="password" name="password" id="password" className="password" onChange={e => setPassword(e.target.value)} value={password} placeholder='Password' ref={passwordRef} onKeyDown={(e) => handleKeyDown(e, cPasswordRef)} />
              {(passwordError) && <p className='error'>Password must be min 8 character</p>}

              <input type={showPwd ? "text" : "password"} name="c-password" id="c-password" className="password" onChange={e => setCPassword(e.target.value)} value={cPassword} placeholder='Confirm Password' ref={cPasswordRef} />
              {(cpasswordError) && <p className='error'>Password Mismatched</p>}

              <div className="check"><input type="checkbox" name="show-password" id="show-password" className="show-password" onClick={() => setShowPwd(!showPwd)} /> Show Password</div>
              {(loading) && <p className='loading'>Loading...</p>}
              {(error) && <p className='error'>Username already found or Invalid Password!</p>}
              <button type='submit' className='login'>Register</button>
            </>
          }
          <h6 className="m-0 msg">{(registerInfo.length > 0 ) ? "Success! Go to login.." : "Already have an account?"}</h6>
          <button type='button' className="register" onClick={() => navigate('/users/login')}>Login</button>

        </form>
      </div>
    </div>
  )
}

export default Register
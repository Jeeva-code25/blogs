import React, { useEffect, useRef, useState } from 'react'
import logo from '../assets/logo.png'
import './Login.css'
import { loginUser } from '../features/user/loginSlice'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const { userInfo, loading, error } = useSelector(state => state.login)
    const [username, setUsername] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPwd, setShowPwd] = useState(false)

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    useEffect(() => {
        if (!loading && !error && userInfo.accessToken) navigate('/blogs')
    }, [userInfo])

    useEffect(() => {
        setUsernameError(!username.trim().length > 0)
        setPasswordError(!password.trim().length > 0)
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usernameError && !passwordError) {
            const data = {
                username,
                password,
            }
            try {
                dispatch(loginUser(data))
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
                    <h3 className="site-name">Login</h3>
                </div>

                <form className="user-form" onSubmit={handleSubmit}>
                    <input type="text" name="username" id="username" placeholder='Username' className="username" onChange={e => setUsername(e.target.value)} value={username} ref={usernameRef} onKeyDown={(e) => handleKeyDown(e, passwordRef)} autoComplete='off' />
                    {(usernameError) && <p className='error'>Username is required</p>}

                    <input type={showPwd ? "text" : "password"} name="password" id="password" className="password" onChange={e => setPassword(e.target.value)} value={password} placeholder='Password' ref={passwordRef} />
                    {(passwordError) && <p className='error'>Password is required</p>}
                    <div className="check"><input type="checkbox" name="show-password" id="show-password" className="show-password" onClick={() => setShowPwd(!showPwd)} /> Show Password</div>
                    {(loading) && <p className='loading'>Loading...</p>}
                    {(error) && <p className='error'>Invalid user credentials! try again</p>}
                    <button type='submit' className='login'>Login</button>
                    <h6 className="m-0 msg">You don't have an account?</h6>
                    <button type='button' className="register" onClick={() => navigate('/users/register')}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Login
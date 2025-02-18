import React, { useEffect, useRef, useState } from 'react'
import api from '../../config/axiosConfig'
import './Post.css'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoginState } from '../features/user/loginSlice'
import { postBlog } from '../features/blog/blogSlice'

const Post = () => {
  const { userId, accessToken } = useSelector(selectLoginState)
  const {loading, error } = useSelector(state => state.blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [desc, setDesc] = useState('')
  const [descError, setDescError] = useState(false)

  useEffect(() => {
    titleRef.current.focus()
  }, [])

  useEffect(() => {
    setTitleError(!title.trim().length > 0)
    setDescError(desc.trim().length < 50)
  }, [title, desc])

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleValidate()
    if (!titleError && !descError) {
      const data = {
        userId,
        title,
        description: desc
      }
      try {
        if (!accessToken) throw new Error("Empty accessToken Refresh Page")
        dispatch(postBlog({
          token: accessToken,
          data: data
        }))

        if(!loading && !error) navigate('/blogs')

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

  const clearField = (e) => {
    e.preventDefault()
    setTitle("")
    setDesc("")
  }

  const handleValidate = () => {
    setTitleError(!title.trim().length > 0)
    setDescError(desc.trim().length < 50)
  }

  return (
    <main className='post-container'>

      <h3 className="container-title">Create your own Post</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" name="post-title" id="post-title" placeholder='Title' className="post-title" onChange={e => setTitle(e.target.value)} value={title} ref={titleRef} onKeyDown={(e) => handleKeyDown(e, descRef)} />
        {(titleError) && <p className='error'>Blog title is required</p>}

        <textarea name="post-desc" id="post-desc" className="post-desc" onChange={e => setDesc(e.target.value)} value={desc} placeholder='Blog Description' ref={descRef} ></textarea>

        {(descError) && <p className='error'>50 characters required</p>}

        <button className="clear" onClick={clearField}>Clear</button>
        <button type='submit' className='create'>Create</button>
      </form>
      {(loading) && <p className="loading">Loading...</p>}
      {(error) && <p className="error">{error}</p>}
    </main>
  )
}

export default Post
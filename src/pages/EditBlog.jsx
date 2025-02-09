import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../../config/axiosConfig'
import './EditBlog.css'

const EditBlog = ({ setBlogs, blogs, token, userId }) => {
    const id = useParams().id
    const navigate = useNavigate()
    const blog = blogs.find((item) => item._id === id)

    const titleRef = useRef(null)
    const descRef = useRef(null)
    const [title, setTitle] = useState(blog?.title)
    const [titleError, setTitleError] = useState(false)
    const [desc, setDesc] = useState(blog?.description)
    const [descError, setDescError] = useState(false)

    useEffect(() => {
        titleRef.current.focus()
    }, [])

    useEffect(() => {
        setTitleError(!title.trim().length > 0)
        setDescError(!desc.trim().length > 0)
    }, [title, desc])


    const handleSubmit = async (e) => {
        e.preventDefault();
        handleValidate()
        if (!titleError && !descError) {
            const data = {
                id,
                userId,
                title,
                like: 0,
                comment: 'empty',
                description: desc
            }

            try {
                if (!token) throw new Error("Empty token Refresh Page")
                const res = await api.patch('/blogs',
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(res.data);
                const otherblogs = blogs.filter(item => item._id != id)
                setBlogs([...otherblogs, data])

                navigate('/blogs/myblogs')

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

    const handleValidate = () => {
        setTitleError(!title.trim().length > 0)
        setDescError(!desc.trim().length > 0)
    }


    return (
        (blog) ?

            (<main className='post-container'>

                <h3 className="post-tile">Update your Blog</h3>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="edit-title" id="edit-title" placeholder='Title' className="edit-title" onChange={e => setTitle(e.target.value)} value={title} ref={titleRef} onKeyDown={(e) => handleKeyDown(e, descRef)} />
                    {(titleError) && <p className='error'>Blog title is required</p>}

                    <textarea name="edit-desc" id="edit-desc" className='edit-desc' onChange={e => setDesc(e.target.value)} value={desc} placeholder='Blog Description' ref={descRef} ></textarea>

                    {(descError) && <p className='error'>50 characters required</p>}

                    <button type='submit' className='update'>Update</button>
                </form>

            </main>)

            :

            <p className="error">There is no post to show</p>

    )
}

export default EditBlog
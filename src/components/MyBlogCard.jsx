import React from 'react'
import './MyBlogCard.css'
import { Col } from 'react-bootstrap'
import { NavLink } from 'react-router'
import api from '../../config/axiosConfig'
import './MyBlogCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoginState } from '../features/user/loginSlice'
import { deleteBlog } from '../features/blog/blogSlice'

const MyBlogCard = ({ blog}) => {
    const dispatch = useDispatch()
    const { accessToken } = useSelector(selectLoginState)
    const id = blog?._id


    const handleDelete = async (e) => {
        e.preventDefault()
        
        if (id) {
            try {
                if (!accessToken) throw new Error("Empty token Refresh Page")
                    dispatch(deleteBlog({
                        token: accessToken,
                        id: id
                    }))

            } catch (err) {
                console.error(err.message);
            }
        } else {
            console.log("id not specified");

        }

    }

    return (
        <Col xs={12} className='myblog-col mt-2'>
            <p className="date">{blog.updatedDate}</p>
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-desc">{blog.description}</p>

            <div className="modify-box">
            <NavLink to={`/blogs/editblog/${blog._id}`} className="edit-btn">Edit</NavLink >
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
           
        </Col>
    )
}

export default MyBlogCard
import React from 'react'
import './MyBlogCard.css'
import { Col } from 'react-bootstrap'
import { NavLink } from 'react-router'
import api from '../../config/axiosConfig'
import './MyBlogCard.css'

const MyBlogCard = ({ blogs, blog, token }) => {

    const id = blog?._id


    const handleDelete = async (e) => {
        e.preventDefault()
        
        if (id) {
            try {
                if (!token) throw new Error("Empty token Refresh Page")
                const res = await api.delete(`/blogs/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                console.log(res.data);
                const otherblogs = blogs.filter(item => item._id != id)
                setBlogs([...otherblogs])

            } catch (err) {
                console.error(err.message);
            }
        } else {
            console.log("id not specified");

        }

    }

    return (
        <Col xs={12} className='myblog-col my-3'>
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
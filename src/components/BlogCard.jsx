import React from 'react'
import './BlogCard.css'
import { NavLink } from 'react-router'
import { Col } from 'react-bootstrap'

const BlogCard = ({id, title, desc, date}) => {
    return (
        <Col sm={5} lg={3} className='blog-card'>
            <p className="date">{date}</p>
            <h3 className="blog-title">{title}</h3>
            <p className="blog-desc">{desc}</p>
            <NavLink className={"read-more"} to={`/blogs/post/${id}`}>Read more...</NavLink>
        </Col>
    )
}

export default BlogCard
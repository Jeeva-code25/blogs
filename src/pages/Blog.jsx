import React from 'react'
import { useParams } from 'react-router'
import './Blog.css'
import { useSelector } from 'react-redux';
import { selectBlogById } from '../features/blog/blogSlice';

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Blog = () => {
    const id = useParams().id
    const blog = useSelector(state => selectBlogById(state, id))

    const date = blog?.updatedAt.split('T')[0].split('-')
    const getMonth = (date) && MONTH[parseInt(date[1] - 1)]?.slice(0, 3)

    return (
        <main className='blog-conatainer'>
            {(blog) ?
                <>
                    <p className="date">{`${date[2]} ${getMonth} ${date[0]}`}</p>
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-desc">{blog.description}</p>
                </>
                :
                <p className="loading">Blog not found</p>
            }

        </main>
    )
}

export default Blog
import React from 'react'
import { useParams } from 'react-router'
import './Blog.css'

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Blog = ({ blogs }) => {
    const id = useParams().id
    const blog = blogs.find((item) => item._id === id)
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
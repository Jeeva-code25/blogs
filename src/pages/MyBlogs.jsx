import React from 'react'
import { Row } from 'react-bootstrap'
import MyBlogCard from '../components/MyBlogCard';

const MyBlogs = ({blogs, userId, token}) => {
  const myBlogs = blogs.filter(blog => blog.userId === userId)  
  return (
    <main className='py-1 px-5 myblog-container'>
      <Row>
        {
          (myBlogs) &&
          myBlogs.map(blog => {
            
            return(
              <MyBlogCard key={blog._id} blogs={blogs} blog={blog} token={token}/>
            )
          })
        }
      </Row>
      {(!myBlogs.length > 0) &&<p className="no-data" style={{fontSize: "1.5em", textAlign: "center", margin: "10% auto"}}>You have no Post</p> }
    </main>
  )
}

export default MyBlogs
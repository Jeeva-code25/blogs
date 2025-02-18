import React from 'react'
import { Row } from 'react-bootstrap'
import MyBlogCard from '../components/MyBlogCard';
import { useSelector } from 'react-redux';
import { selectLoginState } from '../features/user/loginSlice';
import { selectBlogByUserId } from '../features/blog/blogSlice';

const MyBlogs = () => {
  const { userId} = useSelector(selectLoginState)
  const {loading, error } = useSelector(state => state.blog)  
  const myBlogs = useSelector(state => selectBlogByUserId(state, userId))    
  
  return (
    <main className='py-1 px-5 myblog-container'>
      <Row>
        {
          (myBlogs) &&
          myBlogs.map(blog => {
            
            return(
              <MyBlogCard key={blog._id} blog={blog}/>
            )
          })
        }
      </Row>
      {(loading) && <p className="loading">Loading...</p>}
      {(error) && <p className="error">{error}</p>}
      {(!myBlogs || myBlogs.length <= 0) &&<p className="no-data" style={{fontSize: "1.5em", textAlign: "center", margin: "10% auto"}}>You have no Post</p> }
    </main>
  )
}

export default MyBlogs
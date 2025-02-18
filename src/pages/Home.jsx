import React from 'react'
import './Home.css'
import { Container, Row } from 'react-bootstrap'
import BlogCard from '../components/BlogCard'

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Home = ({blogs, user, loading, error}) => {


  return (
    <main>
      <h5 className="title">Hi, {user.username}</h5>

      {
        (!loading && !error && blogs) &&
          <Container className='blog-container' fluid>
            <Row className='blog-row gap-3'>
              {
                blogs.map((blog) => {
                  const date = blog?.updatedAt.split('T')[0].split('-')
                  const getMonth = MONTH[parseInt(date[1] - 1)].slice(0, 3)
                  return (
                    <BlogCard key={blog._id} id={blog._id} title={blog.title} desc={blog.description} date={`${date[2]} ${getMonth} ${date[0]}`} />
                  )
                })
              }
            </Row>
          </Container>
      }

      {(loading || user.loading) && <p className="loading">Loading...</p>}
      {(!blogs || blogs.length <= 0) && <p className="loading">No Blogs to show</p>}
      {(error || user.error) && <p className="home-error">{error}</p>}


    </main>
  )
}

export default Home
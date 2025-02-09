import React from 'react'
import './Home.css'
import { Container, Row } from 'react-bootstrap'
import BlogCard from '../components/BlogCard'

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Home = ({ username, blogs, loading, error }) => {

  return (
    <main>
      <h5 className="title">Hi, {username}</h5>

      {
        (!loading && !error && blogs) &&
          <Container className='blog-container' fluid>
            <Row className='blog-row gap-3'>
              {
                blogs.map((blog) => {
                  const date = blog.updatedAt.split('T')[0].split('-')
                  const getMonth = MONTH[parseInt(date[1] - 1)].slice(0, 3)
                  return (
                    <BlogCard key={blog._id} id={blog._id} title={blog.title} desc={blog.description} date={`${date[2]} ${getMonth} ${date[0]}`} />
                  )
                })
              }
            </Row>
          </Container>
      }

      {(loading) && <p className="loading">Loading...</p>}
      {(error) && <p className="error">{error}</p>}


    </main>
  )
}

export default Home
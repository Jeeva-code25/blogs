import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Route, Routes } from 'react-router'
import About from './pages/About'
import Post from './pages/Post'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Blog from './pages/Blog'
import api from '../config/axiosConfig'
import MyBlogs from './pages/MyBlogs'
import EditBlog from './pages/EditBlog'


function App() {

  const [search, setSearch] = useState('')
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  const [token, setAccessToken] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {

    const fetchData = async () => {

      try {
        const res = await api.post("/users/login", { username: "Jeevananthan K", password: "Jeeva2002$" });
        const { accessToken, username, userId } = res.data

        setAccessToken(accessToken)
        setUserId(userId)
        setUsername(username)

        if (token) {
          const response = await api.get('/blogs', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (response.status != 201) throw new Error("Response not found")
          setBlogs(response.data)
          setFilteredBlogs(response.data)

        }
      } catch (err) {
        console.error(err.message);
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData();

  }, [token])

  useEffect(() => {
    const matched = blogs.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    setFilteredBlogs([...matched])
  }, [search])

  return (
    <>
      <Routes>
        <Route path='/blogs' element={<Layout search={search} setSearch={setSearch} />}>
          <Route index element={<Home username={username} blogs={filteredBlogs} loading={loading} error={error} />} />
          <Route path='/blogs/post/:id' element={<Blog blogs={blogs} />} />
          <Route path='/blogs/post' element={<Post userId={userId} token={token} />} />
          <Route path='/blogs/myblogs' element={<MyBlogs blogs={blogs} userId={userId} token={token} setBlogs={setBlogs} />} />
          <Route path='/blogs/editblog/:id' element={<EditBlog userId={userId} blogs={blogs} token={token} setBlogs={setBlogs} />} />
          <Route path='/blogs/about' element={<About />} />
          <Route path='/blogs/contact' element={<Contact />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App

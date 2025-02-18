import React, { useEffect, useState } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import About from './pages/About'
import Post from './pages/Post'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Blog from './pages/Blog'
import MyBlogs from './pages/MyBlogs'
import EditBlog from './pages/EditBlog'
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginState } from './features/user/loginSlice';
import { fetchBlog, searchBlog } from './features/blog/blogSlice';
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  const location = useLocation(); // Get current URL path
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(selectLoginState)
  const { loading, error } = useSelector(state => state.blog)
  const blogs = useSelector(state => searchBlog(state, search))

  useEffect(() => {
    if (user.accessToken) dispatch(fetchBlog(user.accessToken))
  }, [user.accessToken])

  // console.log(location.pathname);

  // useEffect(() => {    
    
  //   if (location.pathname.startsWith("/blogs")) {
  //     // Change URL when refreshing
  //     navigate("/users/login", { replace: true }); // Redirect to another page
  //   }
  // }, []);

  return (
    <>
      <Routes>
        <Route path='/'>
          <Route index element={<Login />} />
          <Route path='/users/login' element={<Login />} />
          <Route path='/users/register' element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path='/blogs' element={<Layout search={search} setSearch={setSearch} />}>
          <Route index element={<Home loading={loading} error={error} user={user} blogs={blogs} />} />
          <Route path='/blogs/post/:id' element={<Blog />} />
          <Route path='/blogs/post' element={<Post />} />
          <Route path='/blogs/myblogs' element={<MyBlogs />} />
          <Route path='/blogs/editblog/:id' element={<EditBlog />} />
          <Route path='/blogs/about' element={<About />} />
          <Route path='/blogs/contact' element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)

      setSuccessMessage(`user ${user.username} logged in succesfully`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setUsername('')
      setPassword('')

    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      console.log(loggedUserJSON)
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
      setSuccessMessage('logged out successfully')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('logging out failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const addBlog = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)

      returnedBlog.user = {
        id: user.id,
        name: user.name,
        username: user.username
      }
      setBlogs(blogs.concat(returnedBlog))

      setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch(error) {
      setErrorMessage(
        `a new blog ${blogObject.title} by ${blogObject.author} can't be added`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }


  }

  const toggleLikes = id => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes+1 }
    console.log('moi')
    const usersName = blog.user.name
    const usersId = blog.user.id
    const usersUsername = blog.user.username

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        returnedBlog.user = {
          id: usersId,
          name: usersName,
          username: usersUsername
        }
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService
        .remove(blog)
      setBlogs(blogs.filter(blogi => blogi.id !== blog.id))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} successMessage={successMessage}/>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} successMessage={successMessage}/>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            toggleLikes={() => toggleLikes(blog.id)}
            handleDelete={deleteBlog}
            userLoggedIn = {user.username}
          />
        )}
    </div>
  )
}

export default App
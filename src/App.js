import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [className, setClassName] = useState('')
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setClassName('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.id,
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNotificationMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setClassName('notification')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationMessage(error.response.data.error)
        setClassName('error')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })}

    const handleTitleForm = (event) => {
      setNewTitle(event.target.value)
    }

    const handleAuthorForm = (event) => {
      setNewAuthor(event.target.value)
    }

    const handleUrlForm = (event) => {
      setNewUrl(event.target.value)
    }

    return (
      <div>

        {user === null
          ? <div><h2>log in to application</h2> <Notification message={notificationMessage} className={className} /> < LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /></div>
          : <div>
            <h2>blogs</h2>
            <Notification message={notificationMessage} className={className} /> 
            <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel="new note" ref={blogFormRef}>
            <CreateForm onSubmit={createBlog} titleValue={newTitle} authorValue={newAuthor} urlValue={newUrl} titleChange={handleTitleForm} authorChange={handleAuthorForm} urlChange={handleUrlForm} />
            </Togglable>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        }
      </div>
    )
  }

  export default App
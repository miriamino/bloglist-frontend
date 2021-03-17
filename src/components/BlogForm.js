import React, { useState } from 'react'



const BlogForm = ({ createBlog, user }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleForm = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorForm = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlForm = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.id,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>create new</h2>
      title:<input id='title' value={newTitle} onChange={handleTitleForm} /><br />
      author:<input id='author' value={newAuthor} onChange={handleAuthorForm} /><br />
      url:<input id='url' value={newUrl} onChange={handleUrlForm} /><br />
        <button id='create' type='submit'>create</button>
      </div>
    </form>
  )
}

export default BlogForm
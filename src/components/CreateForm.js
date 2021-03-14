import React, { useState } from 'react'



const CreateForm = ({ createBlog, user }) => {

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
      title:<input value={newTitle} onChange={handleTitleForm} /><br />
      author:<input value={newAuthor} onChange={handleAuthorForm} /><br />
      url:<input value={newUrl} onChange={handleUrlForm} /><br />
                <button type='submit'>create</button>
            </div>
        </form>
    )
}

export default CreateForm
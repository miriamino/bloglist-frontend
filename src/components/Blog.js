import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [detailVisible, setDetailVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  const toggleButton = () => {
    setDetailVisible(!detailVisible)
    setButtonText(detailVisible ? 'view' : 'hide')
  }

  return (
    <div style={blogStyle}>
      < div >
        {blog.title} {blog.author}
        <span>
          <button onClick={toggleButton}>{buttonText}</button>
        </span>
        <div style={showWhenVisible}>

          {blog.url}        <br />
          likes {blog.likes} <button>like</button> <br />
          {blog.user.name}

        </div >
      </div>
    </div>
  )
}

export default Blog

import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {

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
    <div style={blogStyle} className='Blog'>
      < div >
        {blog.title} {blog.author}
        <span>
          <button onClick={toggleButton}>{buttonText}</button>
        </span>
        <div style={showWhenVisible} className='detail'>

          {blog.url}        <br />
          likes {blog.likes} <button onClick={updateBlog}>like</button> <br />
          {blog.user.name} <br />
          {user.username === blog.user.username &&
            <button onClick={removeBlog}>remove</button>
          }
        </div >
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog

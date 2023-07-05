import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, toggleLikes, handleDelete, userLoggedIn }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [informationVisible, setInformationVisible] = useState(false)

  const hideWhenVisible = { display: informationVisible ? 'none' : '' }
  const showWhenVisible = { display: informationVisible ? '' : 'none' }

  const deleteButton = () => {
    if (blog.user.username === userLoggedIn) {
      return (
        <div> <button onClick={() => handleDelete(blog)}>remove</button> </div>
      )
    }
  }

  return (
    <div className='blog' style={blogStyle}>

      <div style={hideWhenVisible} className='titleandauthor'>
        {blog.title} {blog.author}
        <button id='view-button' onClick={() => setInformationVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible} className='moredetails' >

        {blog.title} {blog.author}
        <button onClick={() => setInformationVisible(false)}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={toggleLikes}>like</button></div>
        <div>{blog.user.name}</div>
        {deleteButton()}

      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  toggleLikes: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userLoggedIn: PropTypes.string.isRequired
}

export default Blog


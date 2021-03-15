import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let updateBlog

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Not ME',
      url: 'https://whattheurl.gay',
      likes: 4,
      user: 'Mee Me'
    }

    const user = {
      id: 'Mee Me'
    }

    updateBlog = jest.fn()
    component = render(
      <Blog blog={blog} user={user} updateBlog={updateBlog} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('the component displaying a blog renders the blogs title and author, but does not render its url or number of likes by default', () => {
    const blogComponent = component.container.querySelector('.Blog')

    expect(blogComponent).toHaveTextContent('Component testing is done with react-testing-library Not ME')

    const detailView = component.container.querySelector('.detail')
    expect(detailView).toHaveStyle('display: none')
  })

  test('the blogs url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const detailView = component.container.querySelector('.detail')
    expect(detailView).not.toHaveStyle('display: none')
    expect(detailView).toHaveTextContent(
      'likes'
    )
  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const updateBlogButton = component.getByText('like')
    fireEvent.click(updateBlogButton)
    fireEvent.click(updateBlogButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})
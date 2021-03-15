import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()
  const user = {
    username: 'testuser',
    name: 'Tax Testermann',
    id: '5f705c8980ef8d646335cb2f'
  }

  const component = render(
    <BlogForm createBlog={createBlog} user={user} />
  )

  const form = component.container.querySelector('form')
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'this author' }
  })
  fireEvent.change(url, {
    target: { value: 'some url' }
  })
  fireEvent.submit(form)

  component.debug()

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('this author')
  expect(createBlog.mock.calls[0][0].url).toBe('some url')
})
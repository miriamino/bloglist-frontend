import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders title and author of blog but not likes, url and user', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me Myself',
    url: 'someurl',
    likes: '4',
    user: 'Eoo'
  }
  const user = {
    username: 'fklfe',
    name: 'You ooo',
  }


  const component = render(
    <Blog blog={blog} user={user} />
  )


  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library Me Myself'
  )
  expect(component.container.querySelector('.detail')).toHaveStyle('display: none')

})

test('blogs url and number of likes are shown when the button controlling the shown details has been clicked.', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me Myself',
    url: 'someurl',
    likes: '4',
    user: 'Eoo'
  }
  const user = {
    username: 'fklfe',
    name: 'You ooo',
  }


  const component = render(
    <Blog blog={blog} user={user} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'someurl'
  )
  expect(component.container).toHaveTextContent(
    'likes 4'
  )

})

test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me Myself',
    url: 'someurl',
    likes: '4',
    user: 'Eoo'
  }
  const user = {
    username: 'fklfe',
    name: 'You ooo',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)


})
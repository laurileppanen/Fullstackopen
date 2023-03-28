import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calling createBlog function with correct data', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Laurin kirja' )
  await user.type(authorInput, 'Lauri Leppänen' )
  await user.type(urlInput, 'lauri.fi' )

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Laurin kirja')
  expect(createBlog.mock.calls[0][0].author).toBe('Lauri Leppänen')
  expect(createBlog.mock.calls[0][0].url).toBe('lauri.fi')

})
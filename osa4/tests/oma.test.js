const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog') 

const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app) 


beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salainen', 10)
  const user = new User({
    username: 'teme1717',
    name: 'Teemu Lehtiö',
    blogs: [],
    passwordHash
  })

  await user.save()
})


beforeEach(async () => {
  await Blog.deleteMany({})

  const users = await User.find({})
  const user = users[0]
  const id = users[0]._id

  const blogObject = helper.initialBlogs
    .map(blog => new Blog({
      _id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: id.toString(),
      likes: blog.likes ? blog.likes : 0
    }))
  
  const blogPromises = blogObject.map(blog => blog.save())  
  await Promise.all(blogPromises)
  
   
})



test('adding a new blog without a token returns 401 Unauthorized', async () => {
  const newBlog = {
    title: 'No token',
    author: 'UntiToken',
    url: 'https://notoken.com',
    likes: 87,
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
}, 10000)
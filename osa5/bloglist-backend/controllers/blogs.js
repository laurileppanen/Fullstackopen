const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})

  response.json(blogs)

  })

  
  blogsRouter.post('/', userExtractor ,async (request, response) => {
    const body = request.body
    
    const user = request.user
    console.log(user)
  
    console.log(body)
    console.log(body.title)
    
  
    if(body.title === undefined || body.url === undefined) {
      return response.status(400).end()
    }
    
    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: body.likes,
      
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.json(savedBlog)
  
  })
  
  
  blogsRouter.delete('/:id', userExtractor, async (request,response) => { 
  
    const id = request.params.id
    console.log('poistettavan blogin id', id)
  
    const blogi = await Blog.findById(id)
    const useri = blogi.user.toString()
    console.log('poistettavan blogin userin id', useri)
  
    const user = request.user
  
    if (useri !== user._id.toString()) {
      return response.status(401).json({ error: 'the deleter is not the owner' })
    }
   
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
      likes: body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true }
    )

    if (updatedBlog) {
      response.json(updatedBlog.toJSON())
    } else {
      response.status(404).json({ error: 'Blog not found' })
    }

  })

module.exports = blogsRouter  
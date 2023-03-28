const User = require('../models/user')
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' })
    }
  
    next(error)
  }

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')

    const type = request.get('Content-Type')

    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
    } else {
      request.token = null
    }
  
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    if (!request.token) {
      return response.status(401).json({ error: 'missing token' })
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    request.user = user
    next()
  
  } catch (error) {
    if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' })
    }
    next(error)
  }
    

}  

  module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
  }
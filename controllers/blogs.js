const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7)
  }
  return null
}

blogsRouter.get('/debug', async (req, res) => {
  await Blog.remove({})
  res.status(200)
})

blogsRouter.get('/', async (request, response) => {
  const result = await Blog
    .find({})
    .populate('user', { user: 1, name: 1, adult: 1 })
  response.json(result.map(Blog.format))

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    if (body.title == null) {
      return response.status(400).json({ error: 'title missing' })
    }

    if (body.url == null) {
      return response.status(400).json({ error: 'url missing' })
    }

    const user = await User.findById(decodedToken.id)

    const likes = body.likes == null ? 0 : body.likes

    const newBlog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id
    })


    const savedBlog = await newBlog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = { ...body }
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updated)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter

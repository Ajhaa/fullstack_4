const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)

})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title == null) {
    return response.status(400).json({ error: 'title missing'})
  }
  if (request.body.url == null) {
    return response.status(400).json({ error: 'url missing'})
  }
  let newBlog = request.body
  if (request.body.likes == null) {
    newBlog = {...newBlog, likes: 0}
  }
  const blog = new Blog(newBlog)

  const saved = await blog.save()
  response.status(201).json(saved)

})

module.exports = blogsRouter

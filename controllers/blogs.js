const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)

})

blogsRouter.post('/', async (request, response) => {
  if (request.body.title == null) {
    return response.status(400).json({ error: 'title missing' })
  }
  if (request.body.url == null) {
    return response.status(400).json({ error: 'url missing' })
  }
  let newBlog = request.body
  if (request.body.likes == null) {
    newBlog = { ...newBlog, likes: 0 }
  }
  const blog = new Blog(newBlog)

  const saved = await blog.save()
  response.status(201).json(saved)

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {...body}
  console.log(blog)
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    console.log("Updated",updated)
    response.json(updated)
  } catch (exception) {
    console.log(exception)
    response.status(400).send({error: 'malformatted id'})
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

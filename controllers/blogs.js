const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const result = await Blog
    .find({})
    .populate('user', {user: 1, name: 1, adult: 1})
  response.json(result.map(Blog.format))

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.title == null) {
    return response.status(400).json({ error: 'title missing' })
  }
  if (body.url == null) {
    return response.status(400).json({ error: 'url missing' })
  }
  const users = await User.find({})
  const user = users[0]

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

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {...body}
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
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

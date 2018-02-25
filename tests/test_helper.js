const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testiblogi3',
    author: 'Atte',
    url: 'localhost 3001',
    likes: 3
  },
  {
    title: 'EiTestiBlogi',
    author: 'Norsu',
    url: 'localhost 3001',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}

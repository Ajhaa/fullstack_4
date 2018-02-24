const Blog = require('../models/blog')

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
const format = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(format)
}

module.exports = {
  initialBlogs, format, blogsInDb
}

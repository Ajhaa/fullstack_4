const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, format, blogsInDb } = require('./test_helper')

describe('initially some blogs in database', () => {

  beforeAll(async () => {
    await Blog.remove({})

    const blogObjects = initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))
  })

  describe('GET blogs', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('the first blog is correct', async () => {
      const response = await api
        .get('/api/blogs')

      expect(response.body[0].title).toBe('Testiblogi3')
    })

    test('there are right amount of blogs', async () => {
      const response = await api
        .get('/api/blogs')

      expect(response.body.length).toBe(initialBlogs.length)
    })

  })

  describe('POST blogs', () => {

    test('a valid blog can be added', async () => {
      const blogsBefore = await blogsInDb()
      const newBlog = {
        title: 'Jalmarin blogi',
        author: 'Jalmar',
        url: 'localhost 3001',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/blogs')

      const blogsAfter = await blogsInDb()
      blogsAfter.forEach(n => delete n.id)
      expect(blogsAfter.length).toBe(blogsBefore.length + 1)
      expect(blogsAfter).toContainEqual(newBlog)
    })

    test('if likes is not defined, it is set to 0', async () => {
      const newBlog = {
        title: 'Jalmarin blogi',
        author: 'Jalmar',
        url: 'localhost 3001'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/blogs')

      const latest = response.body[response.body.length - 1]
      expect(latest.likes).toBe(0)
    })

    test('if title is undef, status 400', async () => {
      let newBlog = {
        author: 'Jalmar',
        url: 'localhost 3001'
      }
      const blogBefore = await blogsInDb()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogAfter = await blogsInDb()
      expect(blogAfter.length).toBe(blogBefore.length)
    })

    test('if url is undef, status 400', async () => {
      let newBlog = {
        title: "Hello world",
        author: 'Jalmar'
      }
      const blogBefore = await blogsInDb()
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogAfter = await blogsInDb()
      expect(blogAfter.length).toBe(blogBefore.length)
    })
  })
})

afterAll(() => {
  server.close()
})

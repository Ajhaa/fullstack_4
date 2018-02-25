const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb } = require('./test_helper')

describe('initially some blogs in database', () => {
  let loginToken
  let user_id
  beforeEach(async () => {
    await Blog.remove({})
    await User.remove({})
    const blogObjects = initialBlogs.map(b => new Blog(b))
    await Promise.all(blogObjects.map(b => b.save()))

    const testUser = {
      user: "testi",
      name: "testaaja",
      adult: true,
      password: "taikasana"
    }

    const loginCreds = {
      user: testUser.user,
      password: testUser.password
    }
    const respUser = await api
      .post('/api/users')
      .send(testUser)

    user_id = respUser.body._id
    const loginData = await api
      .post('/api/login')
      .send(loginCreds)
    loginToken = loginData.body.token
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

      const h = 'bearer ' + loginToken
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', h)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api
        .get('/api/blogs')

      const blogsAfter = await blogsInDb()
      blogsAfter.forEach(n => delete n.id)
      expect(blogsAfter.length).toBe(blogsBefore.length + 1)
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
        .set('Authorization', ('bearer ' + loginToken))
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
        .set('Authorization', ('bearer ' + loginToken))
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
        .set('Authorization', ('bearer ' + loginToken))
        .expect(400)

      const blogAfter = await blogsInDb()
      expect(blogAfter.length).toBe(blogBefore.length)
    })
  })

  describe('DELETE blog', () => {
    let added
    beforeAll(async () => {
      await Blog.remove({})
      added = new Blog( {
        title: "DELETE",
        author: "eiole",
        url: "http://DELETE",
        likes: 0,
        user: user_id
      })
      await added.save()
    })
    test('delete deletes blog', async () => {
      const blogsBefore = await blogsInDb()

      await api
        .delete(`/api/blogs/${added._id}`)
        .set('Authorization', ('bearer ' + loginToken))
        .expect(204)

      const blogsAfter = await blogsInDb()
      blogsAfter.forEach(b => delete b.id)
      expect(blogsAfter).not.toContainEqual(added)
      expect(blogsAfter.length).toBe(blogsBefore.length - 1)
    })
  })

  describe('update single blog', () => {
    let added
    beforeAll(async () => {
      added = new Blog( {
        title: "UPDATE THIS",
        author: "eiole",
        url: "http://UPDATE",
        likes: 0
      })
      await added.save()
    })
    test('updating blog updates correctly', async () => {
      const blogsBefore = await blogsInDb()

      const updated = {...added._doc, likes: 5}

      await api
        .put(`/api/blogs/${added._id}`)
        .send(updated)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const blogsAfter = await blogsInDb()
      expect(blogsAfter.length).toBe(blogsBefore.length)
    })
  })
  afterAll(() => {
    server.close()
  })
})




const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

beforeAll(async () => {
  await Blog.remove({})

  let blogObject = new Blog({
    title: 'Testiblogi3',
    autho: 'Atte',
    url: 'localhost 3001',
    likes: 3
  })
  await blogObject.save()

})

test('blogs are returned as json', async () => {
    await api
      .get('api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    server.close()
})

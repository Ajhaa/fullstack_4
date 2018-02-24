const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
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

beforeAll(async () => {
  await Blog.remove({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})
describe('GET blogs', () => {


  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the first blog is "Testiblogi3"', async () => {
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

    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('Jalmarin blogi')
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
    console.log(latest)
    expect(latest.likes).toBe(0)
  })

  test('if title or url is undef, status 400', async () => {
    let newBlog = {
      author: 'Jalmar',
      url: 'localhost 3001'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    newBlog = {
      title: 'Jalmarin blogi',
      author: 'Jalmar'
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })
})

afterAll(() => {
  server.close()
})

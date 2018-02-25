const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { usersInDb } = require('./test_helper')
const bcrypt = require

describe('initally some users in database', () => {
  beforeEach(async () => {
    await User.remove({})
    const user = new User({
      user: "moist",
      name: "lukkai",
      adult: true,
      password: "salainen"
    })

    await user.save()
  })
  describe('Post user', () => {

    test('adding a user is succesful', async () => {
      const initialUsers = await usersInDb()
      const newUser = {
        user: "atte",
        name: "haa",
        adult: true,
        password: "tosisala"
      }
      const res = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAfter = await usersInDb()
      expect(usersAfter.length).toBe(initialUsers.length + 1)
    })

    test('no duplicate usernames allowed', async () => {
      const initialUsers = await usersInDb()
      const newUser = {
        user: "moist",
        name: "laatikko",
        adult: true,
        password: "supersala"
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAfter = await usersInDb()
      expect(usersAfter.length).toBe(initialUsers.length)
    })

    test('password length checked', async () => {
      const initialUsers = await usersInDb()
      const newUser = {
        user: "uniiq",
        name: "laatikko",
        adult: true,
        password: "ly"
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      const usersAfter = await usersInDb()

      expect(usersAfter.length).toBe(initialUsers.length)
    })

    test('if adult not defined, set to true', async () => {
      await User.remove({})
      const newUser = {
        user: "lern",
        name: "laatikko",
        password: "lynkers"
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

      const usersAfter = await usersInDb()
      expect(usersAfter.length).toBe(1)
      expect(usersAfter[0].adult).toBe(true)
    })
  })

  describe('Get users', () => {
    test('Users are returned as json', async () => {
      const usersBefore = await usersInDb()

      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('correct amount of users returned', async() => {
      const usersBefore = await usersInDb()
      const response = await api.get('/api/users')

      expect(response.body.length).toBe(usersBefore.length)
    })

  })
  afterAll(() => {
    server.close()
  })
})



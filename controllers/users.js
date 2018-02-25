const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/debug', async (req, res) => {
  await User.remove({})
  res.status(200)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    return response.status(400).json({error: 'password too short'})
  }

  const existingUser = await User.find({user: body.user})
  if (existingUser.length > 0) {
    return response.status(400).json({error: 'username must be unique'})
  }
  const isAdult = body.adult == null ? true : body.adult

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    user: body.user,
    name: body.name,
    adult: isAdult,
    passwordHash
  })
  console.log('User',user)
  const saved = await user.save()
  response.status(201).json(saved)
})

usersRouter.get('/', async (request, response) => {
  const result = await User
    .find({})
    .populate('blogs', {title: 1, url: 1, likes: 1})
  response.json(result.map(User.format))
})

module.exports = usersRouter

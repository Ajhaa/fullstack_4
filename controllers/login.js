const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ user: body.user })

  const passwordCorrect = user === null ?
    false :
    await bcrypt.compare(body.password, user.passwordHash)

  if ( !(user && passwordCorrect) ) {
    return response.status(401).send({ error: 'invalid username or password' })
  }

  const userForToken = {
    user: user.user,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, user: user.user, name: user.name })
})

module.exports = loginRouter

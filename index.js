const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('Connected to database', config.mongoUrl)
  })
  .catch(err => {
    console.log(err)
  })

mongoose.Promise = global.Promise
app.use(middleware.tokenExtractor)

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const server = http.createServer(app)
if (!module.parent) {


  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
  })
}

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}

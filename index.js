const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const creds = require('./creds')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = `mongodb://${creds.user}:${creds.pass}@ds223578.mlab.com:23578/atte-fullstack`
mongoose
  .connect(mongoUrl)
  .then (() => {
    console.log('Connected to database', mongoUrl)
  })
  .catch( err => {
    console.log(err)
  })

mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

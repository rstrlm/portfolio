const config = require('./utils/config')
require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const skillRouter = require('./controllers/skills')
const Skill = require('./models/skill')
const skill = require('./models/skill')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


// Routes

const login = process.env.LOGIN_ROUTE

app.use('/api/skills', skillRouter)

app.get('/', (req, res) => {
  res.send('<h1>You should not be here</h1>')
})

app.get(`/api/${login}`, (req,res) => {
  res.send(`login route is ${login}`)
})

// redirects rest of the routes to home
app.get('*', (req, res) => {
  res.redirect('/')
})


app.use(morgan(':method :url :status :response-time ms :type '))

const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (res.headersSent) {
    return next(error)
  } else if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

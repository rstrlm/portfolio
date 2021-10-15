require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Skill = require('./models/skill')
const { response } = require('express')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/', (req, res) => {
    res.send('<h1>You should not be here</h1>')
})

app.get('/api/skills', (req, res) => {
    Skill.find({}).then(skills => {
      res.json(skills)
    })
})

app.post('/api/skills', (req, res) => {
  const body = req.body
  if(body.name === undefined || body.value === undefined) {
    return res.status(400).json({ error: 'name or value missing'})
  }
  const skill = new Skill({
    name: body.name,
    value: body.value,
  })
  skill.save().then(savedSkill => {
    res.json(savedSkill)
  })
})

app.get('*', (req, res) => {
  res.redirect('/')
})


app.use(morgan(':method :url :status :response-time ms :type '))

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if(res.headersSent) {
        return next(error)
    } else if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

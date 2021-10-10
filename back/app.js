require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Skill = require('./models/skill')

app.get('/', (req, res) => {
    res.send('<h1>You should not be here</h1>')
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

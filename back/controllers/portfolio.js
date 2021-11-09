const portfolioRouter = require('express').Router()
const Skill = require('../models/portfolio')
require('dotenv').config()

const skills = [
    {
      name: 'css',
      id: 1,
      value: 4
    },
    {
      name: 'html',
      id: 2,
      value: 4
    },
    {
      name: 'javascript',
      id: 3,
      value: 4
    },
    {
      name: 'php',
      id: 4,
      value: 1
    },
    {
      name: 'java',
      id: 5,
      value: 2
    }
  ]

  portfolioRouter.get('/', (req, res) => {
    if (!process.env.MONGODB_URI) {
      console.log('no process env for mongo, loading hardcoded skills')
      res.send(skills)
    } else {
    Skill.find({}).then(skills => {
      res.json(skills)
    })
    }
  })
  
  portfolioRouter.post('/', (req, res) => {
    const body = req.body
    if (body.name === undefined || body.value === undefined) {
      return res.status(400).json({ error: 'name or value missing' })
    }
    const skill = new Skill({
      name: body.name,
      value: body.value,
    })
    skill.save().then(savedSkill => {
      res.json(savedSkill)
    })
  })
  
  portfolioRouter.get('/:id', async (req, res ) => {
      const skill = await Skill.findById(req.params.id)
      if (skill) {
          res.json(skill.toJSON())
      } else {
          res.status(404).end()
      }
  })

  module.exports = skillRouter
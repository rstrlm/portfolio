const skillRouter = require('express').Router()
const Skill = require('../models/skill')
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

skillRouter.get('/', (req, res) => {
    if (!process.env.MONGODB_URI) {
      console.log('no process env for mongo, loading hardcoded skills')
      res.send(skills)
    } else {
    Skill.find({}).then(skills => {
      res.json(skills)
    })
    }
  })
  
skillRouter.post('/', (req, res) => {
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
  
  skillRouter.get('/:id', async (req, res ) => {
      const skill = await Skill.findById(req.params.id)
      if (skill) {
          res.json(skill.toJSON())
      } else {
          res.status(404).end()
      }
  })

  skillRouter.delete('/:id', async (request, response) => {
    // const user = await decodeToken(request)
    const skill = await Skill.findById(request.params.id)
    // console.log('blog', blog.user, ' user ', user._id);
    // if(user._id.toString() === blog.user.toString()) {
    if(skill) {
    await Skill.findByIdAndRemove(request.params.id)
    response.status(204).end()
    } else {
    response.status(401).end()
  } 
  })

  module.exports = skillRouter
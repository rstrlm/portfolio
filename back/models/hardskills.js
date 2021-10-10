const mongoose = require('mongoose')

const hardskillSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    skills: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
    },
})



hardskillSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Skill', hardskillSchema)
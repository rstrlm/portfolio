const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        min: [0, 'No negative number'],
        max: [7, 'No more then 7'],
        required: true,
    },
})

skillSchema.plugin(uniqueValidator)

skillSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Skill', skillSchema)
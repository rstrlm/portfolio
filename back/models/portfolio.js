const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const portfolioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    uri: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false,
    }
})

portfolioSchema.plugin(uniqueValidator)

portfolioSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Portfolio', portfolioSchema)
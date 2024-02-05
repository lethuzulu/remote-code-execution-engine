const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    title: String,
    difficulty: String,
})

problemSchema.set('toJSON', {
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})





const Problem = mongoose.model('Problem', problemSchema)

module.exports = {
    Problem
}

const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    dir_link: String,
    file_link: String,
    language: String,
    problem_id: mongoose.Schema.Types.ObjectId,
})

submissionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.submission_id = returnedObject._id.toString()
        returnedObject.problem_id = returnedObject.problem_id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const Submission = mongoose.model('Submission', submissionSchema)

module.exports = {
    Submission,
}

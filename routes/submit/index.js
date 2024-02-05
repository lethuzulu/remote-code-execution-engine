const express = require('express')
const { Submission } = require('../../models/submission')
const { submissionService } = require('../../services/submissionService')
const { publishToQueue } = require('../../services/queueService')

const router = express.Router()

router.post('/', async (req, res) => {

    try {
        //A Send POST to submission service
        //B. After the submission has been made, 
        //...get the submission_id and problem_id and send them to the QUEUE.

        const submission = await submissionService(req.body)

        await publishToQueue({problem_id:submission.problem_id, submission_id: submission._id})
        res.json(submission)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error.')
    }
})

module.exports = router

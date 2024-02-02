const express = require('express')
const { getChannel } = require('../services/connectRabbitMQ')
const router = express.Router()

const QUEUE = 'TASKS'

router.post('/submit', async (req, res) => {
    try {
        const { language, code } = req.body


        //setup message to publish
        const message = JSON.stringify({language, code})


        // //get publisherChannel and publish/send to the event queue
        const channel = await getChannel()
        await channel.assertQueue('q')
        channel.sendToQueue('q', Buffer.from(message))

        // const publisherChannel = await pubblisher.connectPublisher(QUEUE)
        // publisherChannel.sendToQueue(QUEUE, Buffer.from(message))

        // //listen for messages - -connect consumer
        // const consumerChannel = await consumer.connectConsumer(QUEUE)

        //acknowledge request has been received here.
        res.status(200).send('success')
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

module.exports = router

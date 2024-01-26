const express = require('express')
const config = require('./config/config')
const { join } = require('path')
const { mkdir, cp, writeFile } = require('fs/promises')
const publisher = require('./services/publisher')
const consumer = require('./services/consumer')

const app = express()

app.get('/', async (req, res) => {
    try {
        const msg = {number:1}
        const queue="task"
        //publisher
        const publisherChannel = await publisher.connectPublisher(queue)
        //consumer
        const consumerChannel = await consumer.connectConsumer(queue)

        //publish
        publisherChannel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)))

        //consumer
        consumerChannel.consume(queue, (msg)=>{
            console.log("msg content:  ",  msg.content.toString())
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(config.PORT, () => {
    console.log(`Server running on PORT ${config.PORT}`)
})

//docker command  docker run -it -v $PWD/temp/lethu:/usr/src python bash

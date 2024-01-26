const amqplib = require('amqplib')
const config = require('../config/config')

const connectPublisher = async (queue) => {
    try {
        const connection = await amqplib.connect(config.AMQP_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(queue)
        return channel
        // await channel.sendToQueue("tasks", Buffer.from(JSON.stringify(msg)))
    } catch (error) {
        console.log("Publisher Connection Error: ", error)
    }
}

module.exports = {
    connectPublisher,
}

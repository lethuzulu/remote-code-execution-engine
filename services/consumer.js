const amqlib = require('amqplib')
const config = require('../config/config')

const connectConsumer = async (queue) => {
    try {
        const connection = await amqlib.connect(config.AMQP_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(queue)
        return channel
        // channel.consume('tasks', (message) => {
        //     console.log('message:    ', message)
        // })
    } catch (error) {
        console.log('Consumer Connection Error: ', error)
    }
}


module.exports = { connectConsumer }



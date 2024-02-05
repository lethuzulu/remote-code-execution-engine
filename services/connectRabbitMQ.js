const amqplib = require('amqplib')
const config = require('../config/config')

let channel
let connection

const connectRabbitMQ = async () => {
    try {
        connection = await amqplib.connect(config.AMQP_URL)
        console.log('Connected to RabbitMQ')
        return connection
    } catch (error) {
        throw error
    }
}

const getChannel = async () => {
    if (connection) {
        try {
            channel = await connection.createChannel()
            return channel
        } catch (error) {
            throw error
        }
    } else {
        throw Error('Not Connected to RabbitMQ!')
    }
}

module.exports = {
    connectRabbitMQ,
    getChannel,
}

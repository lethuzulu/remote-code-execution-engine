require('dotenv').config()

const PORT = process.env.PORT || 3000
const AMQP_URL = process.env.AMQP_URL
const MONGODB_URI = process.env.MONGODB_URI

module.exports = { PORT, AMQP_URL, MONGODB_URI }

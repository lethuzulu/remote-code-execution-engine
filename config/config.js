require('dotenv').config()

const PORT = process.env.PORT || 3000
const AMQP_URL = process.env.AMQP_URL

module.exports = { PORT, AMQP_URL }

const express = require('express')
const config = require('./config/config')

const app = express() 

app.use(express.json()) // Allow Express to parse JSON

app.use('/api', require('./routes/index'))

module.exports = app
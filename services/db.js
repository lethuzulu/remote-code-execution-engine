const mongoose = require('mongoose')

const config = require('../config/config')

const connectMongoDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connection = await mongoose.connect(config.MONGODB_URI)
        if (connection) {
            console.log('connected to MongoDB')
        }
    } catch (error) {
        console.log('error connecting to MongoDB:', error)
    }
}

module.exports = {
    connectMongoDB
}
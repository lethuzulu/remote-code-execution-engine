const { connectRabbitMQ } = require('./services/connectRabbitMQ')
const app = require('./app')
const config = require('./config/config')
const { setUpConsumer } = require('./services/consumer')
const { connectMongoDB } = require('./services/db')


app.listen(config.PORT, async() => {
    console.log(`Server running on PORT ${config.PORT}`)
    await connectMongoDB()
    await connectRabbitMQ()
    await setUpConsumer()
})

//docker command  docker run -it -v $PWD/temp/lethu:/usr/src python bash

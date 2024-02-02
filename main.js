
const { join } = require('path')
const { mkdir, cp, writeFile } = require('fs/promises')
const { connectRabbitMQ, getChannel } = require('./services/connectRabbitMQ')
const app = require('./app')
const config = require('./config/config')
const { setUpConsumer } = require('./services/consumer')



//api


//conect RabbbitMQ


// connectRabbitMQ()
// .then(()=>{
//     getChannel()
// })
// .catch((error)=>{
//     console.error(error)
// })
app.listen(config.PORT, async() => {
    console.log(`Server running on PORT ${config.PORT}`)
    await connectRabbitMQ()
    await setUpConsumer()
   
})

//docker command  docker run -it -v $PWD/temp/lethu:/usr/src python bash

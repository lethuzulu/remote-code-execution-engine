const { getChannel } = require("./connectRabbitMQ")

const publishToQueue = async (ids) => {
    
    //A. Make message from problem_id and submission_id. Stringify object and make a Buffer from it.
    //B. Get publisherChannel  & publish to Queue

    //------- A -------------//
    const problem_id = ids.problem_id.toString()
    const submission_id = ids.submission_id.toString()
    const message = Buffer.from(JSON.stringify({problem_id, submission_id}))

    //-------B ----------//
    const channel = await getChannel() 
    await channel.assertQueue('q')
    channel.sendToQueue('q', Buffer.from(message))

}

module.exports = {
    publishToQueue,
}

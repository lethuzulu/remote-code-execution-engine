const { mkdir, writeFile, cp} = require('fs/promises')
const { getChannel } = require('./connectRabbitMQ')
const { join, normalize } = require('path')
const { exec } = require('child_process')
const crypto = require('crypto')


const TEMPPATH = normalize(`${__dirname}/../temp`)
const PAYLOADPATH = normalize(`${__dirname}/../utils/payload`)

const setUpConsumer = async () => {
    const channel = await getChannel()
    await channel.assertQueue('q')
    channel.consume('q', async (msg) => {
        if (msg) {
            //prepare bind mount folder
            await prepareBindMountFolder(msg)

            //spin up docker container
            // await spinUpDockerContainer()
            // Acknowledge the message
            channel.ack(msg)
        }
    })
    console.log('Listening for Events')
}

const prepareBindMountFolder = async (msg) => {
    try {
        const parsedMessage = JSON.parse(msg.content.toString('utf-8'))

        const randomWorkDir = join(TEMPPATH, '/', crypto.randomUUID())
        await mkdir(randomWorkDir)

        const randomFilePath = join(randomWorkDir, '/', crypto.randomUUID())
        await writeFile(randomFilePath, parsedMessage.code)

        await cp(PAYLOADPATH, randomFilePath)
    } catch (error) {
        console.log('error   ', error)
    }
}

//docker run -d -it -v $pwd\temp\Lethu:/usr/src/ -w /usr/src/ python bash ./simple.sh python file.py

function spinUpDockerContainer() {
    const localPath = normalize(
        'D:\\projects\\remote-code-execution-engine\\temp\\Lethu'
    )

    const docker_process = exec(
        `docker run -d -w /usr/src -v ${localPath}:/usr/src  python bash ./simple.sh python file.py`,
        (error, stdout, stderr) => {
            if (error) {
                console.error(
                    `Error spinning up Docker image: ${error.message}`
                )
                return
            }
            if (stderr) {
                console.error(`Docker image spin up error: ${stderr}`)
                return
            }
            if (stdout) {
                console.log(
                    `Docker image spun up successfully. Container ID: ${stdout}`
                )
            }
        }
    )
}
module.exports = {
    setUpConsumer,
}

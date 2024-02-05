const { mkdir, writeFile, cp } = require('fs/promises')
const { getChannel } = require('./connectRabbitMQ')
const { join, normalize } = require('path')
const { exec } = require('child_process')
const crypto = require('crypto')
const { Submission } = require('../models/submission')

const TEMPPATH = normalize(`${__dirname}/../temp`)

const submissionService = async ({language, problem_id, code}) => {
    //A. Store code in DATA_STORE
    //B. Insert submission meta_data into DataBase

    try { 
        // A
        const { dirPath, filePath } = await createDataStore(code)

        // B
        const meta_data = await Submission.create({
            language,
            problem_id,
            dir_link: dirPath,
            file_link: filePath,
        })
        return meta_data
    } catch (error) {
        throw error
    }
}

const createDataStore = async (code) => {
    //1. Make folder /temp/xxx/     [random folder name]
    //2. Make file /temp/xxx/yyy  & write code to it.    [random file name]
    //3. return random UUIDs or the complete paths

    try {
        const dirUUID = crypto.randomUUID()
        const fileUUID = crypto.randomUUID()

        const dirPath = join(TEMPPATH, '/', dirUUID)
        const filePath = join(dirPath, '/', fileUUID)
        await mkdir(dirPath)
        await writeFile(filePath, code)
        return { dirPath, filePath }
    } catch (error) {
        throw error
    }
}

// const prepareBindMountFolder = async (msg) => {
//     const randomWorkDir = join(TEMPPATH, '/', crypto.randomUUID())
//     try {
//         const parsedMessage = JSON.parse(msg.content.toString('utf-8'))

//         const randomWorkDir = join(TEMPPATH, '/', crypto.randomUUID())
//         await mkdir(randomWorkDir)

//         const randomFilePath = join(randomWorkDir, '/', crypto.randomUUID())
//         await writeFile(randomFilePath, parsedMessage.code)

//         await cp(PAYLOADPATH, randomWorkDir, {recursive:true})
//     } catch (error) {
//         console.log('error   ', error)
//     }
// }

module.exports = {
    submissionService,
}

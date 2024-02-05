const express = require('express')
const { Problem } = require('../../models/problem')

const router = express.Router()

router.get('/', async (req, res)=>{
    try {
        const problems = await Problem.find({})
        res.json(problems)
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
        
    }
})



module.exports = router
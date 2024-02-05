const express = require('express')

const router = express.Router()

router.use('/submit', require('./submit/index'))

router.use('/problems', require('./problems/index') )



module.exports = router

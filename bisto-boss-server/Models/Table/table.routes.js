const express = require('express')
const { getTable } = require('./table.controller')
const router = express.Router()

router.route('/').get(getTable)

module.exports = router
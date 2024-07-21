const express = require('express')
const { getMenu } = require('./menu.controller')
const router = express.Router()

router.route('/').get(getMenu)

module.exports = router
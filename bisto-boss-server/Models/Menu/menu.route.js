const express = require('express')
const { getMenu, createMenuItem } = require('./menu.controller')
const verifyAdmin = require('../../middleware/verifyAdmin')
const router = express.Router()

router.route('/').get(getMenu)
router.route('/').post(verifyAdmin,createMenuItem)

module.exports = router
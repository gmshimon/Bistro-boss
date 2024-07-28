const express = require('express')
const { getCartItems, postCartItems } = require('./cart.controller')
const router = express.Router()

router.route('/').get(getCartItems)
router.route('/').post(postCartItems)

module.exports = router

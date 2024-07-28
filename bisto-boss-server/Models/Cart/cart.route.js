const express = require('express')
const { getCartItems, postCartItems, deleteCartItems } = require('./cart.controller')
const router = express.Router()

router.route('/').get(getCartItems)
router.route('/').post(postCartItems)
router.route('/').delete(deleteCartItems)

module.exports = router

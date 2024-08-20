const express = require('express')
const { createUser, getAllUsers, fetchUser } = require('./user.controller')
const router = express.Router()

router.route('/').post(createUser)
router.route('/').get(getAllUsers)
router.route('/get-user').post(fetchUser)

module.exports = router
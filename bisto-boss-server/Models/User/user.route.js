const express = require('express')
const { createUser, getAllUsers, fetchUser, getUserDetails } = require('./user.controller')
const verifyToken = require('../../middleware/verifyToken')
const router = express.Router()

router.route('/').post(createUser)
router.route('/').get(getAllUsers)
router.route('/get-user').post(fetchUser)
router.route('/get-details').get(verifyToken,getUserDetails)

module.exports = router
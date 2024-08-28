const express = require('express')
const { getReview, createReview } = require('./review.controller')
const verifyToken = require('../../middleware/verifyToken')
const router = express.Router()

router.route('/').get(getReview)
router.route('/create-review').post(verifyToken,createReview)

module.exports = router
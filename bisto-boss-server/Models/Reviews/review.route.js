const express = require('express')
const { getReview } = require('./review.controller')
const router = express.Router()

router.route('/').get(getReview)

module.exports = router
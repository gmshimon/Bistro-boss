const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const { createBooking } = require('./booking.controller');
const router = express.Router();

router.route('/make-booking').post(verifyToken,createBooking)

module.exports = router
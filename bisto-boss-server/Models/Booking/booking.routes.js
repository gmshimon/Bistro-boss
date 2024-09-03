const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const { createBooking, getMyBooking, cancelMyBooking } = require('./booking.controller');
const router = express.Router();

router.route('/cancel-my-booking/:id').delete(verifyToken,cancelMyBooking)
router.route('/make-booking').post(verifyToken,createBooking)
router.route('/my-booking').get(verifyToken,getMyBooking)

module.exports = router
const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const { createBooking, getMyBooking, cancelMyBooking, getAllBookings } = require('./booking.controller');
const verifyAdmin = require('../../middleware/verifyAdmin');
const router = express.Router();

router.route('/cancel-my-booking/:id').delete(verifyToken,cancelMyBooking)
router.route('/all-bookings').get(verifyAdmin,getAllBookings)
router.route('/make-booking').post(verifyToken,createBooking)
router.route('/my-booking').get(verifyToken,getMyBooking)

module.exports = router
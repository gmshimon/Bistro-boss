const express = require('express');
const { getCardPaymentIntent } = require('./payment.controller');
const verifyToken = require('../../middleware/verifyToken')
const router = express.Router();


router.route('/card-payment-intent').post(verifyToken,getCardPaymentIntent)

module.exports = router;
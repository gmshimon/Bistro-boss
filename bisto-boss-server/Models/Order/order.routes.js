const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const { makeOrder,getMyOrder } = require('./order.controller');
const router = express.Router();

router.route('/make-order').post(verifyToken,makeOrder)
router.route('/get-my-order').get(verifyToken,getMyOrder)

module.exports = router;
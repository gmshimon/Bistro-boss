const express = require('express')
const { getMenu, createMenuItem, getSingleMenu, updateMenuItem } = require('./menu.controller')
const verifyAdmin = require('../../middleware/verifyAdmin')
const router = express.Router()

router.route('/:id').get(getSingleMenu)
router.route('/edit-menu/:id').put(verifyAdmin,updateMenuItem)
router.route('/').get(getMenu)
router.route('/').post(verifyAdmin,createMenuItem)

module.exports = router
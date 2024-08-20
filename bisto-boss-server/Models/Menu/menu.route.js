const express = require('express')
const { getMenu, createMenuItem, getSingleMenu, updateMenuItem, deleteMenuItem } = require('./menu.controller')
const verifyAdmin = require('../../middleware/verifyAdmin')
const router = express.Router()

router.route('/:id').get(getSingleMenu)
router.route('/edit-menu/:id').put(verifyAdmin,updateMenuItem)
router.route('/delete-menu/:id').delete(verifyAdmin,deleteMenuItem)
router.route('/').get(getMenu)
router.route('/').post(verifyAdmin,createMenuItem)

module.exports = router
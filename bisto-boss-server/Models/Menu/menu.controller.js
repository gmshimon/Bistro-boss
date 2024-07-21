const express = require('express')
const Menu = require('./menu.modules')

// Controller and service to fetch all foods from menu
module.exports.getMenu = async (req, res, next) => {
    try {
      const result = await Menu.find({})
      res.status(200).json({
        status: 'Success',
        message: 'Menu successfully fetched',
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'Fail',
        message: 'Fail to Fetch Menu'
      })
    }
  }
const express = require('express')
const Menu = require('./menu.modules')

// Controller and service to fetch all foods from menu
module.exports.getMenu = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 0

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < await Menu.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
  
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    const result = await Menu.find().limit(limit).skip(startIndex).exec();
    res.status(200).json({
      status: 'Success',
      message: 'Menu successfully fetched',
      page:results,
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message
    })
  }
}
module.exports.createMenuItem = async (req, res, next) => {
  try {
    const data = req.body
    const result = await Menu.create(data)
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

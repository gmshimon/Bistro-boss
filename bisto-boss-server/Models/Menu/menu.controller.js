const express = require('express')
const Menu = require('./menu.modules')
const { ObjectId } = require('mongodb')
// Controller and service to fetch all foods from menu
module.exports.getMenu = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalItems = await Menu.countDocuments().exec();
    results.totalItems =totalItems;

    if (endIndex < totalItems) {
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

    // const result = await Menu.find().limit(limit).skip(startIndex).exec();
    const result = await Menu.find()
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

module.exports.getSingleMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Menu.findOne({_id: id});

    res.status(200).json({
      status: 'Success', 
      message: 'Menu successfully fetched',
      data: result,
    });
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({
      status: 'Fail',
      message: error.message,
    });
  }
};

module.exports.updateMenuItem = async(req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Menu.findOne({ _id: id})
    if(!result) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Menu not found',
      })
    }

    const updateItem = await Menu.updateOne(
      { _id: id },
      { $set: req.body }
    )

    res.status(200).json({
      status: 'Success',
      message: 'Menu updated successfully',
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to update menu',
    })
  }
}

module.exports.deleteMenuItem = async (req, res, next) => {
  try {
    const {id} =req.params
    const result = await Menu.findOne({ _id: id})
    if(!result) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Menu not found',
      })
    }
    const deleteItem = await Menu.deleteOne({ _id: id })

    res.status(200).json({
      status: 'Success',
      message: 'Menu deleted successfully',
    })

  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to delete menu',
    })
  }
}
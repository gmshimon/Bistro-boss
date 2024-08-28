const express = require('express')
const Review = require('./review.modules')

// Controller and service to fetch all reviews
module.exports.getReview = async (req, res, next) => {
    try {
      const result = await Review.find({})
      res.status(200).json({
        status: 'Success',
        message: 'Reviews successfully fetched',
        data: result
      })
    } catch (error) {
      res.status(400).json({
        status: 'Fail',
        message: 'Fail to Fetch Reviews'
      })
    }
  }

module.exports.createReview = async(req,res,next)=>{
  try{
    const {name} = req.user
    const data = req.body
    data.name = name
    const result = await Review.create(data)
    res.status(200).json({
      status: 'Success',
      message: 'Review successfully created',
      data: result
    })
  }catch(e){
    res.status(400).json({
      status: 'Fail',
      message: 'Fail to create review'
    })
  }
}
const { generateToken } = require('../../Utilis/token')
const Menu = require('../Menu/menu.modules')
const Orders = require('../Order/order.modules')
const Review = require('../Reviews/review.modules')
const Users = require('./user.modules')

module.exports.createUser = async (req, res) => {
  try {
    const userData = req.body
    const { name, email, role } = userData
    const user = await Users.findOne({ email })

    if (user) {
      const token = generateToken(user)

      res.status(200).send({
        status: 'Success',
        message: 'User already exists',
        data: user,
        token: token
      })
    } else {
      const result = await Users.create(userData)
      const token = generateToken(result)
      res.status(200).json({
        status: 'Success',
        message: 'User created successfully',
        data: result,
        token: token
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to create user',
      error: error.message
    })
  }
}

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find()
    res.status(200).json({
      status: 'Success',
      message: 'Users fetched successfully',
      data: users
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch users',
      error: error.message
    })
  }
}

module.exports.fetchUser = async (req, res, next) => {
  try {
    const data = req.body
    const user = await Users.findOne({ email: data.email })
    if (!user) {
      return res.status(404).json({
        status: 'Fail',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'Success',
      message: 'User fetched successfully',
      data: user
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch users',
      error: error.message
    })
  }
}

module.exports.getUserDetails = async (req, res, next) => {
  try {
    const { email, name } = req.user
    const user = await Users.findOne({ email: email })
    const getOrders = await Orders.find({ email: email })
    const getReviews = await Review.find({ name: name })

    const data = {
      user: user,
      orders: getOrders,
      reviews: getReviews
    }

    res.status(200).json({
      status: 'Success',
      message: 'User details fetched successfully',
      data: data
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch users',
      error: error.message
    })
  }
}

module.exports.adminDetails = async(req,res,next)=>{
  try {
    const users = await Users.find({})
    const totalOrders = await Orders.find({})
    const totalProduct =  await Menu.find({})
    const products = await Menu.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
          categories: { $push: { category: "$_id", count: "$count" } }
        }
      },
      {
        $unwind: "$categories"
      },
      {
        $project: {
          _id: 0,
          category: "$categories.category",
          count: "$categories.count",
          percentage: {
            $multiply: [
              { $divide: ["$categories.count", "$total"] },
              100
            ]
          }
        }
      }
    ]);

    const orders = await Orders.aggregate([
      {
        $unwind: "$carts"  // Unwind the carts array
      },
      {
        $group: {
          _id: "$carts.category",  // Group by the category in the carts array
          totalSold: { $sum: "$carts.quantity" }  // Sum the quantity for each category
        }
      }
    ]);


    const data = {
      customers:users.length,
      totalOrders: orders.length,
      totalProducts: totalProduct.length,
      products:products,
      orders:orders,
      revenue:1000,

    }
    res.status(200).json({
      status: 'Success',
      message: 'Admin details fetched successfully',
      data: data
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Admin details failed to fetch',
      data: error.message
    })
  }
}
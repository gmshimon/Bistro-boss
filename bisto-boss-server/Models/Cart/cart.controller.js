const Cart = require('./cart.modules')

// Controller and service to fetch all Cart items
module.exports.getCartItems = async (req, res, next) => {
  try {
    const {email} = req.query

    const result = await Cart.find({user: email})

    res.status(200).json({
      status: 'Success',
      message: 'Cart Items successfully fetched',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Fail to Fetch Cart Items'
    })
  }
}

// Controller and service to post cart items to the database
module.exports.postCartItems = async (req, res, next) => {
  try {
    const data = req.body
    const result = await Cart.create(data)
    res.status(200).json({
      status: 'Success',
      message: 'Cart ITems successfully saved to the database',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Fail to save Cart Items'
    })
  }
}

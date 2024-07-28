const mongoose = require('mongoose')
const { ObjectId, Timestamp } = require('mongodb')

const cartSchema = mongoose.Schema(
  {
    menuID: {
      type: ObjectId,
      ref: 'Menu',
      required: [true, 'Please provide the ID of the food']
    },
    user: {
      type: String,
      required: [true, 'Please provide the email of the user']
    },
    name:{
        type: String,
        required:[true, 'Please provide the name of the food']
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: [true, 'Please provide the price of the food']
    }
  },
  {
    timestamps: true
  }
)

const Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart

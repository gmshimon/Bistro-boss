const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const validate = require('validator')

const orderSchema = mongoose.Schema({
    name:{
        type:String,
        minLength: 3,
        maxLength: 50
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        validate: [validate.isEmail, 'Please enter a valid email']
    },
    transaction_id:{
        type: String,
        required: true
    },
    total_price:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum :['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    carts:[
        {
            menuID:{
                type: ObjectId,
                ref: 'Menu',
                required: true
            },
            name:{
                type: String,
                required: true
            },
            price:{
                type: String,
                required: true
            },
            totalPrice:{
                type: String,
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            image:{
                type: String,
                required: true
            }
        }
    ]
},{
    timestamps: true
})

const Orders = mongoose.model('Orders',orderSchema)
module.exports = Orders
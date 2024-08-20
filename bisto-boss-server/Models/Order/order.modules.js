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
        unique: true,
        lowercase: true,
        validate: [validate.isEmail, 'Please enter a valid email']
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},{
    timestamps: true
})

// const Users = mongoose.model('Users',userSchema)
// module.exports = Users
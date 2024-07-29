const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const userSchema = mongoose.Schema({
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
})

const Users = mongoose.model('Users',userSchema)
export default Users
const mongoose = require('mongoose')
const validate = require('validator')

const reviewSchema = mongoose.Schema({
    recipeLike:{
        type: String,
        required: true,
    },
    suggestion:{
        type: String,
    },
    name:{
        type:String,
        required: true,
    },
    details:{
        type:String,
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        // required: true,
        default:0
    }
},{collection:'Review'})

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review
const mongoose = require('mongoose')
const validate = require('validator')

const reviewSchema = mongoose.Schema({
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
        default:0
    }
},{collection:'Review'})

const Review = mongoose.model('Review',reviewSchema);
module.exports = Review
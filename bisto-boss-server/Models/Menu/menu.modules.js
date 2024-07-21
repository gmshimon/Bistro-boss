const mongoose = require('mongoose')
const validate = require('validator')

const menuSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the food name'],
    minLength: [3, 'Name must be at least 3 characters']
  },
  recipe: {
    type: String,
    required: [true, 'Please provide the recipe'],
    minLength: [50, 'Recipe must be at least 50 characters']
  },
  image: {
    type: String,
    required: true
  },
  category:{
    type:String,
    enum:{
        values:['soup','salad','pizza','dessert','offered','drinks','popular'],
        message: 'Category Name must be Lunch or Dinner'
    }
  },
  price:{
    type: Number,
    required: [true,"Please provide a valid price"],
    min: 1,
    max: 1000
  }
},{collection:'Menu'})

const Menu = mongoose.model('Menu',menuSchema);
module.exports = Menu;
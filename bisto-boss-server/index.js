// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const { query } = require('express')
require('dotenv').config()
// mongodb://localhost:27017
const port = process.env.PORT || 5000
// Middleware
const app = express()
app.use(cors())
app.use(express.json())

//database connection
mongoose.connect('mongodb://localhost:27017/bistroDb').then(() => {
  console.log('Database connected successfully')
})

//Router
const menuRouter = require('./Models/Menu/menu.route')
const reviewRouter = require('./Models/Reviews/review.route')
// const cartRouter = require('./Models/Cart/cart.route')
const userRouter = require('./Models/User/user.route')

app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, () => {
  console.log('Bistro Boss is listening on port ', port)
  app.use('/api/v1/menu',menuRouter)
  app.use('/api/v1/review',reviewRouter)
  // app.use('/api/v1/cart', cartRouter)
  app.use('/api/v1/user', userRouter)
})

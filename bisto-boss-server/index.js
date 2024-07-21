// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
const { query } = require('express')
require('dotenv').config()
// mongodb://localhost:27017
const port = 5000 || PROCESS.ENV.PORT
// Middleware
const app = express()
app.use(cors())
app.use(express.json())

//database connection
mongoose.connect('mongodb://127.0.0.1:27017/bistroDb').then(() => {
  console.log('Database connected successfully')
})

//Router
const menuRouter = require('./Models/Menu/menu.route')




app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, () => {
  console.log('Bistro Boss is listening on port ', port)
  app.use('/api/v1/menu',menuRouter)
})

// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cron = require('node-cron');
var bodyParser = require('body-parser')
const { query } = require('express')
require('dotenv').config()



const port = process.env.PORT || 5000
// Middleware
const app = express()
app.use(cors())
app.use(express.json())

//bistro_db
//Kola9696

const uri = process.env.URI;

// const uri = 'mongodb://localhost:27017/bistroDb'

//database connection
mongoose.connect(uri).then(() => {
  console.log('Database connected successfully')
})

//Router
const menuRouter = require('./Models/Menu/menu.route')
const reviewRouter = require('./Models/Reviews/review.route')
const userRouter = require('./Models/User/user.route')
const paymentRouter = require('./Models/Payment/payment.routes')
const orderRouter = require('./Models/Order/order.routes')
const bookingRouter = require('./Models/Booking/booking.routes')
const tableRouter = require('./Models/Table/table.routes')
const Booking = require('./Models/Booking/booking.modules');
const Table = require('./Models/Table/table.modules');

app.use('/api/v1/menu', menuRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/payment',paymentRouter)
app.use('/api/v1/order',orderRouter)
app.use('/api/v1/booking',bookingRouter)
app.use('/api/v1/table',tableRouter)


app.get('/', (req, res) => {
  res.send('Server is running')
})


cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookings = await Booking.find({ date: { $lt: today } });

    for (const booking of bookings) {
      const tableId = booking.table; // Assuming each booking has a 'tableId'
      
      // Mark the table as booked
      await Table.updateOne({ _id: tableId },{
        $set: { status: 'available' }
      });
    }

    console.log('Daily task: Table statuses updated based on current bookings.');
  } catch (error) {
    console.error('Error during table status reset:', error);
  }
});


app.listen(port, () => {
  console.log('Bistro Boss is listening on port ', port)
})

module.exports = app;
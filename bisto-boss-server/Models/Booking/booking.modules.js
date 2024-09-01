const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const bookingSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: String,
    required: true
  },
  table: {
    type: ObjectId,
    ref: 'Table',
    required: true
  },
  people: {
    type: Number,
    required: true,
    min: 1
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

const Booking = mongoose.model('Bookings', bookingSchema)
module.exports = Booking

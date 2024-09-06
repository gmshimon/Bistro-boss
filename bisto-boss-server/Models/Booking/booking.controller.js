const Table = require('../Table/table.modules')
const Booking = require('./booking.modules')

module.exports.createBooking = async (req, res, next) => {
  try {
    const data = req.body
    const suitableTable = await Table.findOne({
      capacity: { $gte: data.people },
      status: 'available'
    }).sort({ capacity: 1 })

    if (!suitableTable) {
      return res
        .status(400)
        .json({ message: 'No tables can accommodate this number of people.' })
    }

    data.table = suitableTable._id
    const result = await Booking.create(data)
    const getBooking = await Booking.findOne({ _id: result._id }).populate({
      path: 'table'
    })
    // once the booking has been created the table status is updated
    const updateTableStatus = await Table.updateOne(
      { _id: suitableTable._id },
      {
        $set: { status: 'reserved' }
      }
    )
    res.status(200).json({
      status: 'Success',
      message: 'Booking successfully created',
      data: getBooking
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to create booking',
      error: error.message
    })
  }
}

module.exports.getMyBooking = async (req, res, next) => {
  try {
    const { email } = req.user

    const result = await Booking.find({ email })
    const reversedResult = result.reverse()
    res.status(200).json({
      status: 'Success',
      message: 'Bookings fetched successfully',
      data: reversedResult
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to get booking',
      error: error.message
    })
  }
}

module.exports.cancelMyBooking = async (req, res, next) => {
  try {
    const { id } = req.params
    const { email } = req.user

    const getReservation = await Booking.findOne({ _id: id, email: email })
    console.log(id)
    if (!getReservation) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Booking not found'
      })
    }
    const updateTable = await Table.updateMany(
      { _id: getReservation?.table },
      {
        $set: { status: 'available' }
      }
    )
    const result = await Booking.deleteOne({ _id: id })
    res.status(200).json({
      status: 'Success',
      message: 'Booking cancelled successfully',
      data: result
    })
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to cancel booking',
      error: error.message
    })
  }
}


module.exports.getAllBookings = async(req,res,next)=>{
  try{
    const result = await Booking.find({})
    res.status(200).json({
      status: 'Success',
      message: 'All bookings fetched successfully',
      data: result
    })
  }catch(error){
    res.status(400).json({
      status: 'Fail',
      message: 'Failed to fetch bookings',
      error: error.message
    })
  }
}

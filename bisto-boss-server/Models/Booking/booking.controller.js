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
    
    const getBooking = await Booking.findOne({_id:result._id}).populate({
        path: 'table',
    })
    // once the booking has been created the table status is updated    
    const updateTableStatus = await Table.updateOne({_id:suitableTable._id},{
        $set: { status: 'reserved' }
  
    })
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

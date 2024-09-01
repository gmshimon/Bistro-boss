const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  status:{
    type:String,
    enum:['available','reserved'],
    default: 'available',
  },
  capacity: {
    type: Number,
    enum: [2, 4, 8, 10],
    required: true,
  },
},{collection: 'Table'});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table

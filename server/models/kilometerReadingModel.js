const mongoose = require('mongoose')
const Schema = mongoose.Schema

const kilometerReading = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  reading: {
    type: Number,
    required: true
  },
  serviceType: {
    type: String,
    enum: ['Service', 'Engine Oil Change'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('KilometerReading', kilometerReading)
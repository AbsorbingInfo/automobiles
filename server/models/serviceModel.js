const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
  customerId:{
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  fromDate:{
      type: Date,
      required: true
  },
  tillDate:{
      type: Date,
      required: false
  },
  issue:{
    type: String,
    required: true
  },
  status:{
    type: String,
    default: 'Pending',
    required: false,
  },
  mechanic: {
    name: {
      type: String,
      required: false,
    },
    fromDate: {
      type: Date,
      required: false,
    },
    tillDate: {
      type: Date,
      required: false,
    },
  }
}, { timestamps: true })

module.exports = mongoose.model('Service', serviceSchema)
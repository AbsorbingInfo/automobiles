const mongoose = require('mongoose')
const Schema = mongoose.Schema


const replacementSchema = new Schema({
  serialNumber: {
    type: String,
    required: false,
  },
  receivedFromCustomerDate: {
    type: Date,
    required: false,
  },
  sentToDealerDate: {
    type: Date,
    required: false,
  },
  receivedFromDealerDate: {
    type: Date,
    required: false,
  },
  deliveredDate: {
    type: Date,
    required: false,
  },
  isResolved: {
    type: Boolean,
    default: false,
    required: false,
  },
});

const batterySchema = new Schema({
  brand: {
    type: String,
    required: true
  },
  model:{
    type: String,
    required: true
  },
  mrp: {
    type: Number,
    required: true
  },
  sellingPrice: {
    type: Number,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  dateOfSale: {
    type: Date,
    required: true
  },
  registeredNo:{
    type: String,
    required: true
  },
  proRata:{
    type: String,
    required: true
  },
  replacement:[replacementSchema],
})


module.exports = mongoose.model('Battery', batterySchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  phoneNumber:{
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  roomNo: {
    type: String,
    required: false
  },
  buildingName: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  make: {
    type: String,
    required: false
  },
  model: {
    type: String,
    required: false
  },
  registeredNo: {
    type: String,
    unique: true,
    required: true
  },
  category: {
    type: String,
    required: false
  },
  dob: {
    type: Date,
    required: false,
  },
  lastBirthdayClaim: {
    type: Date,
    required: false,
  },
  aadhaarNo: {
    type: Number,
    required: false,
  },
  nextServiceDueDate: {
    type: Date,
    required: false,
  },
  nextEngineOilDueDate: {
    type: Date,
    required: false,
  },
}, { timestamps: true })

module.exports = mongoose.model('Customer', customerSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const trafficSchema = new Schema({
  ipAddress: String,
  userAgent: String,
},{ timestamps: true });

module.exports = mongoose.model('Traffic', trafficSchema)
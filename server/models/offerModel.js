const mongoose = require('mongoose')
const Schema = mongoose.Schema

const offerSchema = new Schema({
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      imageLink: {
        type: String,
        required: true,
      },
      fromDate: {
        type: Date,
        required: true,
      },
      tillDate: {
        type: Date,
        required: true,
      }
}, { timestamps: true })

module.exports = mongoose.model('Offer', offerSchema)
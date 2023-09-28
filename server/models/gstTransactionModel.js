const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gstTransactionSchema = new Schema({
    customerId:{
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    amount: {
      type : Number,
      required : true
    },
    invoiceLink: {
      type: String,
      required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('GstTransaction', gstTransactionSchema)
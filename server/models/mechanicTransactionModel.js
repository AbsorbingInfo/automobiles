const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mechanicTransactionSchema = new Schema({
    customerId:{
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    mechanicId:{
        type: Schema.Types.ObjectId,
        ref: 'Mechanic',
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

module.exports = mongoose.model('MechanicTransaction', mechanicTransactionSchema)
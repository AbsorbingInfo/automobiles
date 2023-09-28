const mongoose = require('mongoose');
const Schema = mongoose.Schema

const mechanicSchema = new Schema({
    name:{
        type : String,
        required: true
    },
    fathersName:{
        type : String,
        required: false
    },
    photoLink:{
        type : String,
        required: false
    },
    address:{ 
        type : String,
        required: false
    },
    villageAddress:{ 
        type : String,
        required: false
    },
    phoneNo:{
        type : Number,
        required: false
    },
    dob:{
        type : Date,
        required: false
    },
    maritialStatus:{
        type : String,
        required: false
    },
    aadhaarNo:{
        type : String,
        required: false
    },
    panNo:{
        type : String,
        required: false
    },
    emergencyName:{
        type : String,
        required: false
    },
    emergencyRelaton:{
        type : String,
        required: false
    },
    emergencyPhoneNo:{
        type : String,
        required: false
    },
    qualification:{
        type : String,
        required: false
    },
    yearOfQualification:{
        type : Date,
        required: false
    },
    experience:{
        type : String,
        required: false
    },
    referenceName:{
        type : String,
        required: false
    },
    referencePhoneNo:{
        type : Number,
        required: false
    },
    
})

module.exports = mongoose.model('Mechanic',mechanicSchema)
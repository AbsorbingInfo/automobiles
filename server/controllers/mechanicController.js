const Mechanic = require('../models/mechanicModel');
const { getTotalAmountByMechanicId, getTotalAmountForCurrentMonth } = require('./transactionController')
const mongoose = require('mongoose');
const { Readable } = require('stream');
const logger = require('../helpers/logger').logger

// get all mechanics
const getMechanics = async (req, res) => {
    try{
        const specificFields = {
            name:1,
            phoneNo:1,
        };
        const mechanics = await Mechanic.find({}, specificFields);

        const mechanicPromises = mechanics.map(async (mechanic) => {
            const amount = await getTotalAmountForCurrentMonth(mechanic._id);
            const monthlyAmount = await getTotalAmountByMechanicId(mechanic._id);
            const customerWithAmount = {
              _id: mechanic._id,
              name: mechanic.name,
              phoneNo: mechanic.phoneNo,
              totalAmount: amount,
              monthlyAmount: monthlyAmount
            };
            return customerWithAmount;
            });
      
           const mechanicsWithAmounts = await Promise.all(mechanicPromises);
           res.status(200).json(mechanicsWithAmounts);
    }catch(error){
        logger.error("Failed to get all mechanics:", error);
        return res.status(500).json({ error: 'Failed to get all mechanics' })
    }
}

// get a single mechanic
const getMechanic = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Mechanic'})
    }
    const mechanic = await Mechanic.findById(id)
    if (!mechanic) {
        return res.status(404).json({error: 'No such Mechanic'})
    }
    res.status(200).json(mechanic)
}

// create a new mechanic
const createMechanic = async (req, res, drive) => {
    const { name, fathersName, address, villageAddress, phoneNo, dob, maritialStatus, aadhaarNo, panNo, emergencyName, emergencyRelaton, emergencyPhoneNo, qualification, yearOfQualification, experience, referenceName, referencePhoneNo} = req.body
    let emptyFields = []
    if (!name) {
        emptyFields.push('name')
    }
    if (!req.file) {
        emptyFields.push('Image')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    
    // Upload the image to Google Drive
    let fileId;

    try {
        const currentDate = new Date().toISOString().slice(0, 10); 
        const filenameWithDate = currentDate + '-' + req.file.originalname;
        const fileMetadata = {
            name: filenameWithDate,
            parents: ['1y6tv8_dQ9rbLBrO_epm_Z5yqt0c9np_u'],
        };

        const media = {
            mimeType: req.file.mimetype,
            body: Readable.from(req.file.buffer),
        };

        const driveFile = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, webContentLink',
        });
        fileId = driveFile.data.id;
    } catch (error) {
        logger.error("Failed to upload offer image to Google Drive:", error);
        console.log(error)
        return res.status(500).json({ error: 'Failed to upload image to Google Drive' })
    }
 
    
    // Store the Google Drive file link in the imageLink field
    const fileLink = `https://drive.google.com/uc?id=${fileId}`;
    const photoLink = fileLink;
    // add to the database
    try {
        const mechanic = await Mechanic.create({ name, fathersName, photoLink, address, villageAddress, aadhaarNo, phoneNo, dob, maritialStatus, panNo, emergencyName, emergencyRelaton, emergencyPhoneNo, qualification, yearOfQualification, experience, referenceName, referencePhoneNo })
        res.status(200).json(mechanic)
    } catch (error) {
        console.log(error)
        logger.error("Error creating Mechanic:", error);
        res.status(400).json({ error: error.message })
    }
}

// delete a mechanic
const deleteMechanic = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such Mechanic'})
    }

    const mechanic = await Mechanic.findOneAndDelete({_id: id})

    if(!mechanic) {
        return res.status(400).json({error: 'No such Mechanic'})
    }

    res.status(200).json(mechanic)
}
  

module.exports = {
    getMechanics,
    getMechanic,
    createMechanic,
    deleteMechanic
}

const Battery = require('../models/batteryModel')
const mongoose = require('mongoose')
const path = require('path');
const logger = require('../helpers/logger').logger


// get all customers
const getBatteryRecords = async (req, res) => {
  try{
    const batteryRecords = await Battery.find({}).sort({createdAt: -1})
    res.status(200).json(batteryRecords)
  }catch(error){
    console.log(error)
    logger.error("Error getting battery records:", error);
  }
}

// get all customers
const getBatterycount = async (req, res) => {
  try{
    const batteryRecords = await Battery.find({}).sort({createdAt: -1})
    res.status(200).json(batteryRecords.length)
  }catch(error){
    console.log(error)
    logger.error("Error getting battery records:", error);
  }
}

// get a single customer
const getBatteryRecord = async (req, res) => {
  try{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'Invalid Id'})
    }
    const battery = await Battery.findById(id)
    if (!battery) {
      return res.status(404).json({error: 'No such battery record'})
    }
    res.status(200).json(battery)
  }catch(error){
    console.log(error)
    logger.error("Error getting battery records:", error);
  }
}

// create a new customer
const createBatteryRecord = async (req, res) => {
  const {registeredNo, brandSubmit, model, mrp, sellingPrice, serialNumber, dateOfSale, proRata} = req.body
  let emptyFields = []
  if (!registeredNo) {
    emptyFields.push('Registered Number')
  }
  if (!brandSubmit) {
    emptyFields.push('Brand')
  }
  if (!model) {
    emptyFields.push('Model')
  }
  if (!mrp) {
    emptyFields.push('Mrp')
  }
  if (!sellingPrice) {
    emptyFields.push('Selling Price')
  }
  if (!serialNumber) {
    emptyFields.push('Serial Number')
  }
  if (!mrp) {
    emptyFields.push('Mrp')
  }
  if (!dateOfSale) {
    emptyFields.push('Date Of Sale')
  }
  if (!proRata) {
    emptyFields.push('Pro Rata')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
  // add to the database
  try {
    const battery = await Battery.create({registeredNo, brand:brandSubmit, model, mrp, sellingPrice, serialNumber, dateOfSale, proRata})
    res.status(200).json(battery)
  } catch (error) {
    console.log("fail battery")
    logger.error("Error creating battery record:", error);
    res.status(400).json({ error: error.message })
  }
}

// Update customer
const addReplacementBattery = async (req, res) => {
  const { id } = req.params;
  const {serialNumber} = req.body;
  let emptyFields = []
  if (!id) {
    emptyFields.push('id')
  }
  if (!serialNumber) {
    emptyFields.push('serialNumber')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error("Error updating battery:", `No such battery record: id ${id}`);
    return res.status(404).json({ error: 'No such battery record' });
  }

  try {
    const battery = await Battery.findById(id);
    if (!battery) {
      logger.error("Error updating battery:", `No such battery record: id ${id}`);
      return res.status(404).json({ error: 'No such battery record' });
    }

    const existingReplacementIndex = battery.replacement.findIndex(
        (replacement) => replacement.serialNumber === serialNumber
    );

    if(existingReplacementIndex === -1){
        const newReplacement = {
            serialNumber,
        };
        battery.replacement.push(newReplacement);
    }else{
        return res.status(400).json({ error: 'Serial number already added as replacement' });
    }
    await battery.save();
    res.status(200).json(battery);
  } catch (error) {
    logger.error("Error updating battery record:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateReceivedFromCustomerDate = async (req, res) => {
    const { id } = req.params;
    const { serialNumber, receivedFromCustomerDate } = req.body;
  
    let emptyFields = []
    if (!id) {
      emptyFields.push('id')
    }
    if (!serialNumber) {
      emptyFields.push('serialNumber')
    }
    if (!receivedFromCustomerDate) {
      emptyFields.push('receivedFromCustomerDate')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
  
    try {
      const updatedBattery = await Battery.findOneAndUpdate(
        { _id: id, 'replacement.serialNumber': serialNumber },
        { $set: { 'replacement.$.receivedFromCustomerDate': receivedFromCustomerDate } },
        { new: true, upsert: true }
      );
  
      if (!updatedBattery) {
        logger.error("Error updating battery:", `No such battery record: id ${id}`);
        return res.status(404).json({ error: 'No such battery record' });
      }

      updatedBattery.replacement.map(async(replacement) => {
        if(replacement.serialNumber === serialNumber){
          if(replacement.receivedFromCustomerDate &&
            replacement.sentToDealerDate &&
            replacement.receivedFromDealerDate &&
            replacement.deliveredDate){
              await Battery.updateOne(
                { _id: id, 'replacement.serialNumber': serialNumber },
                { $set: { 'replacement.$.isResolved': true } }
              )
          }
        }
      })

      res.status(200).json(updatedBattery);
    } catch (error) {
      logger.error("Error updating customer:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const updateSentToDealerDate = async (req, res) => {
    const { id } = req.params;
    const { serialNumber, sentToDealerDate } = req.body;

    let emptyFields = []
    if (!id) {
      emptyFields.push('id')
    }
    if (!serialNumber) {
      emptyFields.push('serialNumber')
    }
    if (!sentToDealerDate) {
      emptyFields.push('sentToDealerDate')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const updatedBattery = await Battery.findOneAndUpdate(
        { _id: id, 'replacement.serialNumber': serialNumber },
        { $set: { 'replacement.$.sentToDealerDate': sentToDealerDate } },
        { new: true, upsert: true }
        );

        if (!updatedBattery) {
        logger.error("Error updating battery:", `No such battery record: id ${id}`);
        return res.status(404).json({ error: 'No such battery record' });
        }

        updatedBattery.replacement.map(async(replacement) => {
          if(replacement.serialNumber === serialNumber){
            if(replacement.receivedFromCustomerDate &&
              replacement.sentToDealerDate &&
              replacement.receivedFromDealerDate &&
              replacement.deliveredDate){
                await Battery.updateOne(
                  { _id: id, 'replacement.serialNumber': serialNumber },
                  { $set: { 'replacement.$.isResolved': true } }
                )
            }
          }
        })

        res.status(200).json(updatedBattery);
    } catch (error) {
        logger.error("Error updating customer:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateReceivedFromDealerDate = async (req, res) => {
    const { id } = req.params;
    const { serialNumber, receivedFromDealerDate } = req.body;

    let emptyFields = []
    if (!id) {
      emptyFields.push('id')
    }
    if (!serialNumber) {
      emptyFields.push('serialNumber')
    }
    if (!receivedFromDealerDate) {
      emptyFields.push('sentToDealerDate')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const updatedBattery = await Battery.findOneAndUpdate(
        { _id: id, 'replacement.serialNumber': serialNumber },
        { $set: { 'replacement.$.receivedFromDealerDate': receivedFromDealerDate } },
        { new: true, upsert: true }
        );

        if (!updatedBattery) {
        logger.error("Error updating battery:", `No such battery record: id ${id}`);
        return res.status(404).json({ error: 'No such battery record' });
        }

        updatedBattery.replacement.map(async(replacement) => {
          if(replacement.serialNumber === serialNumber){
            if(replacement.receivedFromCustomerDate &&
              replacement.sentToDealerDate &&
              replacement.receivedFromDealerDate &&
              replacement.deliveredDate){
                await Battery.updateOne(
                  { _id: id, 'replacement.serialNumber': serialNumber },
                  { $set: { 'replacement.$.isResolved': true } }
                )
            }
          }
        })
        res.status(200).json(updatedBattery);
    } catch (error) {
        logger.error("Error updating customer:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateDeliveredDate = async (req, res) => {
    const { id } = req.params;
    const { serialNumber, deliveredDate } = req.body;

    let emptyFields = []
    if (!id) {
      emptyFields.push('id')
    }
    if (!serialNumber) {
      emptyFields.push('serialNumber')
    }
    if (!deliveredDate) {
      emptyFields.push('deliveredDate')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    try {
        const updatedBattery = await Battery.findOneAndUpdate(
        { _id: id, 'replacement.serialNumber': serialNumber },
        { $set: { 'replacement.$.deliveredDate': deliveredDate } },
        { new: true, upsert: true }
        );

        if (!updatedBattery) {
        logger.error("Error updating battery:", `No such battery record: id ${id}`);
        return res.status(404).json({ error: 'No such battery record' });
        }

        updatedBattery.replacement.map(async(replacement) => {
          if(replacement.serialNumber === serialNumber){
            if(replacement.receivedFromCustomerDate &&
              replacement.sentToDealerDate &&
              replacement.receivedFromDealerDate &&
              replacement.deliveredDate){
                await Battery.updateOne(
                  { _id: id, 'replacement.serialNumber': serialNumber },
                  { $set: { 'replacement.$.isResolved': true } }
                )
            }
          }
        })

        res.status(200).json(updatedBattery);
    } catch (error) {
        logger.error("Error updating customer:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
  getBatteryRecords,
  getBatterycount,
  getBatteryRecord,
  createBatteryRecord,
  addReplacementBattery,
  updateReceivedFromCustomerDate,
  updateSentToDealerDate,
  updateReceivedFromDealerDate,
  updateDeliveredDate
}
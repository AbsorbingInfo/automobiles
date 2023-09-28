const KilometerReading = require('../models/kilometerReadingModel')
const Customer = require('../models/customerModel')
const logger = require('./logger').logger
const addDaysToToday = require('./date')

const updateKilometerReadingAndEngineOilDueDate = async (customerId, invoiceData) => {
  try {
    const latestReading = await KilometerReading.findOne({ customerId }).sort({ date: -1 });

    const engineOilDueDate = addDaysToToday(parseInt(invoiceData[6]))

    if (latestReading) {
      const today = new Date();
      const latestDate = new Date(latestReading.date);

      if (today.toDateString() !== latestDate.toDateString()) {
        await KilometerReading.create({ customerId, reading: invoiceData[9], serviceType: "Engine Oil Change" });
      }
    } else {
      await KilometerReading.create({ customerId, reading: invoiceData[9], serviceType: "Engine Oil Change" });
    }

    await Customer.findByIdAndUpdate(customerId, { nextEngineOilDueDate: engineOilDueDate }, {
      runValidators: true,
    });
  } catch (error) {
    logger.error('Error updating Kilometer Reading and Engine Oil Due Date:', error);
  }
};

const updateKilometerReadingAndServiceDueDate = async (customerId, invoiceData) => {
  try {
    let serviceDueDate;
    //calculate next service due date for VIP eligibility
    if(invoiceData[7].toLowerCase().includes('royalenfield')){
      //Royal Enfield service due after 75 days
      serviceDueDate = addDaysToToday(75)
    }else if(invoiceData[7].toLowerCase().includes('regular')){
      //Regular servicedue after 60 days
      serviceDueDate = addDaysToToday(60)
    }else if(invoiceData[7].toLowerCase().includes('sport')){
      //Regular Service due after 70 days
      serviceDueDate = addDaysToToday(70)
    }
    await Customer.findByIdAndUpdate(customerId, { nextServiceDueDate: serviceDueDate }, { 
      runValidators: true,
    });

    const latestReading = await KilometerReading.findOne({ customerId }).sort({ date: -1 });

    if (latestReading) {
      const today = new Date();
      const latestDate = new Date(latestReading.date);

      if (today.toDateString() !== latestDate.toDateString()) {
        await KilometerReading.create({ customerId, reading: invoiceData[9], serviceType: "Service" });
      }
    } else {
      await KilometerReading.create({ customerId, reading: invoiceData[9], serviceType: "Service" });
    }
  } catch (error) {
    logger.error('Error updating Kilometer Reading and Service Due Date:', error);
  }
};

module.exports = {
  updateKilometerReadingAndServiceDueDate,
  updateKilometerReadingAndEngineOilDueDate
}
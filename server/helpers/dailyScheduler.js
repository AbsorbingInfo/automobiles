const Customer = require('../models/customerModel')
const { sendBirthdayOffer, sendEngineOilReminder, sendServiceDueReminder } = require('./whatsappMessages')
const logger = require('./logger').logger
const addDaysToToday = require('./date')

//Birthday
const birthadayWish = async () => {
  try{
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth() + 1;
    
    const customers = await Customer.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$dob' }, todayDate] },
          { $eq: [{ $month: '$dob' }, todayMonth] },
        ],
      },
    });

    const promises = customers.map((customer) => {
      let firstname = "Rider"
      if(customer.name){
        firstName = customer.name.split(" ")[0]
      }
      //return sendBirthdayOffer(firstName, customer.registeredNo, customer.phoneNumber);
    });
        
    //Wait for all async operations to complete
    Promise.all(promises)
      .catch((error) => {
          logger.error('Error sending birthday offers:', error);
      });
  }catch(error){
    logger.error('Error sending birthday offers:', error)
  }
};

//Engine Oil Reminder - 3 days before due
const engineOilReminder = async() => {
  try{
    const fiveDaysFromToday = addDaysToToday(3);
    const date = fiveDaysFromToday.getDate();
    const month = fiveDaysFromToday.getMonth() + 1;
    const year = fiveDaysFromToday.getFullYear();

    const customers = await Customer.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$nextEngineOilDueDate' }, date] },
          { $eq: [{ $month: '$nextEngineOilDueDate' }, month] },
          { $eq: [{ $year: '$nextEngineOilDueDate' }, year] },
        ],
      },
    });
    
    const promises = customers.map((customer) => {
      let firstname = "Rider"
      if(customer.name){
        firstName = customer.name.split(" ")[0]
      }
      //return sendEngineOilReminder(firstName, customer.phoneNumber);
    });

    Promise.all(promises)
      .catch((error) => {
        logger.error('Error sending Engine Oil Reminders:', error);
      });
  }catch(error){
    logger.error('Error sending Engine Oil Reminders:', error)
  }
}

//VIP offer Service due Reminder - 3 days before due
const serviceDueReminder = async() => {
  try{
    const fiveDaysFromToday = addDaysToToday(3);
    const date = fiveDaysFromToday.getDate();
    const month = fiveDaysFromToday.getMonth() + 1;
    const year = fiveDaysFromToday.getFullYear();

    const customers = await Customer.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$nextServiceDueDate' }, date] },
          { $eq: [{ $month: '$nextServiceDueDate' }, month] },
          { $eq: [{ $year: '$nextServiceDueDate' }, year] },
        ],
      },
    });

    const promises = customers.map((customer) => {
      let specialPrice, regularPrice, daysValid
      let firstname = "Rider"
      if(customer.name){
        firstName = customer.name.split(" ")[0]
      }
      if(customer.category.toLowerCase().includes('royalenfield')){
        specialPrice = 555
        regularPrice = 700
        daysValid = 75
      }else if(customer.category.toLowerCase().includes('regular')){
        specialPrice = 380
        regularPrice = 450
        daysValid = 60
      }else if(customer.category.toLowerCase().includes('sport')){
        specialPrice = 500
        regularPrice = 600
        daysValid = 70
      }
      //return sendServiceDueReminder(firstName, customer.phoneNumber, specialPrice, regularPrice, daysValid);
    });

    Promise.all(promises)
      .catch((error) => {
          logger.error('Error sending VIP offer service due Reminders:', error);
      });
  }catch(error){
    logger.error('Error sending VIP offer service due Reminders:', error)
  }
}

module.exports = { 
  birthadayWish, 
  engineOilReminder, 
  serviceDueReminder 
}
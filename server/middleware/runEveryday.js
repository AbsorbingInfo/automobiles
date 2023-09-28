const Customer = require('../models/customerModel')
const winston = require("winston");
const path = require('path');
const { sendBirthdayOffer } = require('../controllers/whatsappMessages')

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: path.join(__dirname,"../", "logs", "runEverday.log"),
      handleExceptions: true,
      maxsize: 9242880,
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  exitOnError: false,
});



//Find birthdays and send offer
const todaysBirthday = async () => {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;

  try {
    const customers = await Customer.find({
      $expr: {
        $and: [
          { $eq: [{ $dayOfMonth: '$dob' }, currentDay] },
          { $eq: [{ $month: '$dob' }, currentMonth] }
        ]
      }
    });

    if (customers.length > 0) {
      for (const customer of customers) {
        //await sendBirthdayOffer(customer);
      }
    }
  } catch (error) {
    logger.error('Error Sending Birthday Offer:', error)
  }
}

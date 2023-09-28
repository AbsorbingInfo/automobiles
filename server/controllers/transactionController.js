const MechanicTransaction = require('../models/mechanicTransactionModel')
const NoGstTransaction = require('../models/noGstTransactionModel')
const GstTransaction = require('../models/gstTransactionModel')
const Customer = require('../models/customerModel')
const Mechanic = require('../models/mechanicModel')
const { sendInvoice } = require('../helpers/whatsappMessages')
const { readFromPdf } = require('../helpers/pdfReader')
const { updateKilometerReadingAndServiceDueDate, updateKilometerReadingAndEngineOilDueDate
  } = require('../helpers/transactionHelper')
const mongoose = require('mongoose')
const logger = require('../helpers/logger').logger
const path = require('path')
const fs = require('fs')
const { authorizeGoogleDrive, uploadInvoiceToDrive } = require('../helpers/googleDrive')
const  { transformString } = require('../helpers/validateVehicleNumber')
const addDaysToToday = require('../helpers/date')

//google drive authorization
const drive = authorizeGoogleDrive()

const createTransaction = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload an invoice in pdf' });
  }
  try {
    let customer;

    //Upload the invoice to Google Drive
    const invoiceLink = await uploadInvoiceToDrive(req, drive);

    //Read text from pdf
    const invoiceData = await readFromPdf(req)

    //check if the customer exists by vehicle no
    const validatedRegisteredNo = transformString(invoiceData[3])
    const existingCustomer = await Customer.findOne({ validatedRegisteredNo })
    
    if(existingCustomer){
      //if customer exists
      customer = existingCustomer
    }else{
      // if the customer doesnt already exists create new customer
      try{
        customer = await Customer.create({ name: invoiceData[2], phoneNumber: invoiceData[8], 
          registeredNo: validatedRegisteredNo, category: invoiceData[7], 
          make: invoiceData[0], model: invoiceData[1]});
      }catch(error){
        logger.error("Error creating new customer during invoice upload:", error)
      }
    }
    //send whatsapp Invoice
    //await sendInvoice(req, customerName, motorVehicleNo, invoiceType, errorFields, successFields))

    // Add to the database
    const customerId = customer._id

    //If servicing is done 
    if(invoiceData[4].toLowerCase().includes('yes')){
      await updateKilometerReadingAndServiceDueDate(customerId, invoiceData)
    }

    //If engine oil is changed
    if(invoiceData[5].toLowerCase().includes('yes')){
      await updateKilometerReadingAndEngineOilDueDate(customerId, invoiceData)   
    }

    //storing invoice in suitable db according to type
    if(invoiceData[11] === 'ENTERPRISES'){
      let mechanicId = 0
      const mechanicList = await Mechanic.find({ name: { $regex: new RegExp(invoiceData[10], 'i') } });
      if(mechanicList.length>0){
        mechanicId = mechanicList[0]._id
      }
      await MechanicTransaction.create({ customerId, mechanicId, amount: invoiceData[11], invoiceLink });
    }else if(invoiceData[11] === 'AUTOMOBILES'){
      await GstTransaction.create({ customerId, amount: invoiceData[11], invoiceLink });
    }else if(invoiceData[11] === 'TRADERS'){
      await NoGstTransaction.create({ customerId, amount: invoiceData[11], invoiceLink });
    }

    //deleting the file from server
    await fs.unlink(path.join(__dirname, '../assets/uploads/', req.file.filename), (error) => {
      if (error) {
        logger.error("Error deleting the invoice:", error);
      }
    });
    // res.status(200).json([errorFields, successFields]);
    res.status(200).json()
  } catch (error) {
    logger.error("Failed to upload invoice:", error);
    return res.status(500).json(errorFields);
  }
}

const getTransactionsByMechanicId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error("Invalid customer ID");
    return res.status(400).json({ error: 'Invalid customer ID' });
  }
  try {
    // Find all transactions for the given mechanicId
    const mechanicTransactions = await MechanicTransaction.find({ mechanicId: id });
    res.status(200).json(mechanicTransactions);
  } catch (error) {
    logger.error("Failed to get transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getMonthlyTransactionsByMechanicId = async (req, res) => {
  const { id } = req.params;
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Find all transactions for the given mechanicId
    const mechanicTransactions = await MechanicTransaction.find({ 
      mechanicId: id,
      createdAt: { $gte: firstDayOfMonth, $lte: today }
     });
    res.status(200).json(mechanicTransactions);
  } catch (error) {
    logger.error("Failed to get transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getTransactionsByCustomerId = async (req, res) => {
  const { id } = req.params;
  try {
    // Find all transactions for the given customerId
    const gstTransactions = await GstTransaction.find({ customerId: id });
    const noGstTransactions = await NoGstTransaction.find({ customerId: id });
    const mechanicTransactions = await MechanicTransaction.find({ customerId: id });
    const allTransactions = [...gstTransactions, ...noGstTransactions, ...mechanicTransactions];
    res.status(200).json(allTransactions);
  } catch (error) {
    logger.error("Failed to get transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const getTotalRevenue = async (req, res) => {
  try {
    // Fetch documents for each transaction
    const gstTransactions = await GstTransaction.find({});
    const noGstTransactions = await NoGstTransaction.find({});
    const mechanicTransactions = await MechanicTransaction.find({});

    // Calculate the total amounts
    const gstAmount = gstTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const noGstAmount = noGstTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const mechanicAmount = mechanicTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    // Find total amount for the given customerId
    const totalAmount = gstAmount + noGstAmount + mechanicAmount;
    res.status(200).json(totalAmount);
  } catch (error) {
    logger.error("Failed to get transaction amount:", error);
    return 0
  }
}

const getTotalRevenueGst = async (req, res) => {
  try {
    // Fetch documents for each transaction
    const gstTransactions = await GstTransaction.find({});

    // Calculate the total amount
    const gstAmount = gstTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    res.status(200).json(gstAmount);
  } catch (error) {
    logger.error("Failed to get transaction amount:", error);
    return 0
  }
}

const getTotalRevenueNoGst = async (req, res) => {
  try {
    // Fetch documents for each transaction
    const noGstTransactions = await NoGstTransaction.find({});

    // Calculate the total amount
    const noGstAmount = noGstTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    res.status(200).json(noGstAmount);
  } catch (error) {
    logger.error("Failed to get transaction amount:", error);
    return 0
  }
}

const getTotalRevenueMechanic = async (req, res) => {
  try {
    // Fetch documents for each transaction
    const mechanicTransactions = await MechanicTransaction.find({});

    // Calculate the total amount
    const mechanicAmount = mechanicTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    res.status(200).json(mechanicAmount);
  } catch (error) {
    logger.error("Failed to get transaction amount:", error);
    return 0
  }
}

const getGstTransactionForLineChart = async (req, res) => {
  try {
    const { type } = req.params
    let collection
    if(type ==='gst'){
      collection = GstTransaction
    }else if(type ==='nogst'){
      collection = NoGstTransaction
    }else if(type ==='mechanic'){
      collection = MechanicTransaction
    }

    const lastTwelveWeeks = [addDaysToToday(-84), addDaysToToday(-77), addDaysToToday(-70), addDaysToToday(-63), addDaysToToday(-56), addDaysToToday(-49),
      addDaysToToday(-42), addDaysToToday(-35), addDaysToToday(-28), addDaysToToday(-21), addDaysToToday(-14), addDaysToToday(-7)]
    
    const results=[]

      for (let index = 0; index < lastTwelveWeeks.length; index++) {
        const start = lastTwelveWeeks[index]
        let end;
        if(index === lastTwelveWeeks.length-1){
          end = new Date()
        }else{
          end = lastTwelveWeeks[index+1]
        }
        const total = await collection.aggregate([
          {
            $match: {
              createdAt: {
                $gte: start,
                $lte: end
              }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }
            }
          }
        ]);

        if (total.length === 0) {
          results.push({
            x: `${index + 1}`,
            y: 0
          });
        } else {
          results.push({
            x: `${index + 1}`,
            y: total[0].total
          });
        }
      }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getAmountByCustomerId = async (id) => {
  try {
    const customerId = new mongoose.Types.ObjectId(id);

    // Fetch documents for each type of transaction
    const gstTransactions = await GstTransaction.find({ customerId });
    const noGstTransactions = await NoGstTransaction.find({ customerId });
    const mechanicTransactions = await MechanicTransaction.find({ customerId });

    // Calculate the total amounts
    const gstAmount = gstTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const noGstAmount = noGstTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    const mechanicAmount = mechanicTransactions.reduce((total, transaction) => total + transaction.amount, 0);

    // Find total amount for the given customerId
    const totalAmount = gstAmount + noGstAmount + mechanicAmount;

    return totalAmount
  } catch (error) {
    logger.error("Failed to get transaction amount:", error);
    return 0
  }
}

const getTotalAmountByMechanicId = async (id) => {
  try {
    const mechanicId = new mongoose.Types.ObjectId(id);

    // Fetch documents for each transaction
    const mechanicTransactions = await MechanicTransaction.find({ mechanicId });

    // Calculate the total amounts
    const totalAmount = mechanicTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    
    return totalAmount
  } catch (error) {
    logger.error("Failed to get transaction amount:", error);
    return 0
  }
}

const getTotalAmountForCurrentMonth = async (mechanicId) => {
  try {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const mechanicTransactions = await MechanicTransaction.find({
      mechanicId,
      createdAt: { $gte: firstDayOfMonth, $lte: today }
    });
    const totalAmount = mechanicTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return totalAmount;
  } catch (error) {
    logger.error("Failed to get transaction amount:", error);
    return 0;
  }
}

module.exports = {
  createTransaction,
  getTransactionsByCustomerId,
  getAmountByCustomerId,
  getTotalAmountByMechanicId,
  getTotalAmountForCurrentMonth,
  getTransactionsByMechanicId,
  getMonthlyTransactionsByMechanicId,
  getTotalRevenue,
  getTotalRevenueGst,
  getTotalRevenueNoGst,
  getTotalRevenueMechanic,
  getGstTransactionForLineChart
}
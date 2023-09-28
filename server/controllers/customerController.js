const Customer = require('../models/customerModel')
const { getAmountByCustomerId } = require('./transactionController')
const mongoose = require('mongoose')
const logger = require('../helpers/logger').logger
const XLSX = require('xlsx')
const fs = require('fs')
const  { transformString } = require('../helpers/validateVehicleNumber')

// get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });

    const customerPromises = customers.map(async (customer) => {
      const amount = await getAmountByCustomerId(customer._id);
      const customerWithAmount = {
        _id: customer._id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        email: customer.email,
        roomNo: customer.roomNo,
        buildingName: customer.buildingName,
        location: customer.location,
        make: customer.make,
        model: customer.model,
        registeredNo: customer.registeredNo,
        category: customer.category,
        dob: customer.dob,
        lastBirthdayClaim: customer.lastBirthdayClaim,
        aadhaarNo: customer.aadhaarNo,
        nextServiceDueDate: customer.nextServiceDueDate,
        nextEngineOilDueDate: customer.nextEngineOilDueDate,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        __v: customer.__v,
        amount: amount
      };
      return customerWithAmount;
    });

    const customersWithAmounts = await Promise.all(customerPromises);
    res.status(200).json(customersWithAmounts);
  } catch (error) {
    logger.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// get a single customer
const getCustomer = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such customer'})
  }
  const customer = await Customer.findById(id)
  if (!customer) {
    return res.status(404).json({error: 'No such customer'})
  }
  res.status(200).json(customer)
}

// get multiple customers by id
const getCustomersByIds = async (req, res) => {
  const { ids } = req.params;
  if (!ids) {
    return res.status(200).json([]);
  }
  const customerIds = ids.split(',');
  if (!customerIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
    return res.status(404).json({ error: 'Invalid customer IDs' });
  }
  try {
    const customers = await Customer.find({ _id: { $in: customerIds } });
    if (customers.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(customers);
  } catch (error) {
    logger.error("Error getting customers by ids:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// create a new customer
const createCustomer = async(req, res) => {
  const {name, phoneNumber, email, roomNo, buildingName, location, make, modelSubmit, registeredNo, category, dob} = req.body
  let emptyFields = []
  if (!phoneNumber) {
    emptyFields.push('phoneNumber')
  }
  if (!registeredNo) {
    emptyFields.push('registeredNo')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
  // add to the database
  try {
    let customer
    const existingCustomer = await Customer.findOne({ registeredNo });
    if (existingCustomer) {
      customer = existingCustomer
      await updateCustomer(existingCustomer._id, name, phoneNumber, email, roomNo, buildingName, location, make, modelSubmit, category, dob)
    } else {
      customer = await Customer.create({ name, phoneNumber, email, roomNo, buildingName, location, make, model:modelSubmit, registeredNo, category, dob })
    }
    res.status(200).json({customer})
  } catch (error) {
    logger.error("Error creating customers:", error);
    res.status(400).json({ error: error.message })
  }
}

// create a new customers from excel
const createCustomerExcel = async(req, res) => {
  try {
    const excelCustomers = req.file;
    const workbook = await XLSX.readFile(excelCustomers.path);

    const sheetNames = workbook.SheetNames;
    const sheet = workbook.Sheets[sheetNames[0]];

    const data = await XLSX.utils.sheet_to_json(sheet);

    const promises = data.map(async(obj) => {
      const registeredNo = obj['registeredNo'];
      const phoneNumber = obj['phoneNumber'];
      const category = obj['category'];
      
      const validatedRegisteredNo = transformString(registeredNo)

      const existingCustomer = await Customer.findOne({ registeredNo: validatedRegisteredNo });
      if (existingCustomer) {
        existingCustomer.phoneNumber = phoneNumber;
        if(category){
          existingCustomer.category = category;
        }
        await existingCustomer.save()
      } else {
        if(category){
          await Customer.create({ registeredNo: validatedRegisteredNo, phoneNumber, category})
        }else{
          await Customer.create({ registeredNo: validatedRegisteredNo, phoneNumber})
        }
      }
    });

    await Promise.all(promises)
      .catch((error) => {
        logger.error('Error creating new customers from excel:', error);
      });

    //deleting the file from server
    await fs.unlink( excelCustomers.path, (error) => {
      if (error) {
        logger.error("Error removing excel file from while creating new customers:", error);
      }
    });
    res.status(200)
  } catch (error) {
    logger.error("Error creating new customers from excel:", error);
    res.status(400).json({ error: error.message })
  }
}

// Get number of customers
const getCustomerCount = async (req, res) => {
  try {
    const customerCount = await Customer.countDocuments({});
    res.status(200).json({ count: customerCount });
  } catch (error) {
    logger.error("Error getting customer count:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// check customer by RegisteredNo
const checkCustomerByRegisteredNo = async (req, res) => {
  const { id } = req.params

  const customer = await Customer.find({ registeredNo: id })
  if (!customer) {
    return res.status(404).json({error: 'No such customer'})
  }
  res.status(200).json(customer)
}

// update Adhaar card number
const updateAdhaarCardNo = async (req, res) => {
  const { registeredNo } = req.params
  const { aadhaarNo } = req.body

  const customer = await Customer.find({ registeredNo: registeredNo })
  if (!customer) {
    return res.status(404).json({error: 'No such customer'})
  }
  customer.aadhaarNo = aadhaarNo;
  await customer.save();

  res.status(200).json(customer)
}

// update birthday claim date
const updateBirthdayClaimDate = async (req, res) => {
  const { registeredNo } = req.params
  const { date } = req.body

  const customer = await Customer.find({ registeredNo: registeredNo })
  if (!customer) {
    return res.status(404).json({error: 'No such customer'})
  }

  customer.lastBirthdayClaim = date;
  await customer.save();

  res.status(200).json(customer)
}

// Update customer
const updateCustomer = async (id, name, phoneNumber, email, roomNo, buildingName, location, make, modelSubmit, category, dob) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error("Error updating customer:", `No such customer: id ${id}`);
    return res.status(404).json({ error: 'No such customer' });
  }

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      logger.error("Error updating customer:", `No such customer: id ${id}`);
      return res.status(404).json({ error: 'No such customer' });
    }
    customer.name = name;
    customer.phoneNumber = phoneNumber;
    customer.email = email;
    customer.roomNo = roomNo;
    customer.buildingName = buildingName;
    customer.location = location;
    customer.make = make;
    customer.model = modelSubmit;
    customer.dob = dob;
    customer.category = category;
    await customer.save();
    console.log('boo yay')
  } catch (error) {
    logger.error("Error updating customer:", error);
  }
}


module.exports = {
  getCustomers,
  getCustomer,
  getCustomersByIds,
  createCustomer,
  getCustomerCount,
  checkCustomerByRegisteredNo,
  createCustomerExcel,
  updateAdhaarCardNo,
  updateBirthdayClaimDate
}
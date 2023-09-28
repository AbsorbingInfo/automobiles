const Service = require('../models/serviceModel')
const Customer = require('../models/customerModel')
const { sendBookingConfirmation, sendBookingAlertToAdmin} = require('../helpers/whatsappMessages')
const mongoose = require('mongoose')
const logger = require('../helpers/logger').logger

// get all services
const getServices = async (req, res) => {
  try{
    if(req.headers.status === 'Delivered'){
      const services = await Service.find({status : 'Delivered'}).sort({createdAt: -1});
      res.status(200).json(services)
    }else{
      const services = await Service.find({ status: { $ne: 'Delivered' } }).sort({ createdAt: -1 });
      res.status(200).json(services)
    }
  }catch(error){
    logger.error("Error getting all services :", error);
  }
}

// get a single service
const getService = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such service'})
  }

  const service = await Service.findById(id)

  if (!service) {
    logger.error("Error getting single service:", error);
    return res.status(404).json({error: 'No such service'})
  }

  res.status(200).json(service)
}

// create a new service
const bookService = async (req, res) => {
  const { customerId, issue } = req.body

  let emptyFields = []

  if (!customerId) {
    emptyFields.push('customerId')
  }
  if (!issue) {
    emptyFields.push('issue')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
  // add to the database
  try {
    const fromDate = Date.now()
    const service = await Service.create({ customerId, issue , fromDate})
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    const phoneNumber = customer.phoneNumber;
    const customerName = customer.name;
    const vehicleRegistrationNumber = customer.registeredNo;
    //await sendBookingConfirmation(customerName, vehicleRegistrationNumber, phoneNumber)
    //await sendBookingAlertToAdmin(customerName, vehicleRegistrationNumber, customer.make, customer.model, customer.phoneNumber )
    res.status(200).json(service)
  } catch (error) {
    logger.error("Error creating service:", error);
    res.status(400).json({ error: "Internal Server Error"})
  }
}

// Update the status of a service
const updateServiceStatus = async (req, res) => {
  const { id } = req.params;
  const { status, mechanic } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error("Error updating service:", `No such service: id ${id}`);
    return res.status(404).json({ error: 'No such service' });
  }

  try {
    const service = await Service.findById(id);
    if (!service) {
      logger.error("Error updating service:", `No such service: id ${id}`);
      return res.status(404).json({ error: 'No such service' });
    }
    if(status){
      service.status = status; 
    }
    if (mechanic) {
      service.mechanic.name = mechanic
    }
    if (status == "Servicing") {
      service.mechanic.fromDate = Date.now()
    }
    if (status == "Serviced") {
      service.mechanic.tillDate = Date.now()
    }
    if (status == "Delivered") {
      service.tillDate = Date.now()
      if(service.mechanic.fromDate & !service.mechanic.tillDate){
        service.mechanic.tillDate = Date.now()
      }
    }
    await service.save();

    res.status(200).json(service);
  } catch (error) {
    logger.error("Error updating service status:", error);
    console.error(error)
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get number of services.
const getServiceCount = async (req, res) => {
  console.log(req.body)
  try {
    const serviceCount = await Service.countDocuments({});
    res.status(200).json({ count: serviceCount });
  } catch (error) {
    logger.error("Error getiing service count :", error);
    res.status(500).json({ error: 'Server error' });
  }
};

// delete a service
const deleteService = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    logger.error("Error deleting service:", `No such service: id ${id}`);
    return res.status(400).json({error: 'No such service'})
  }
  const service = await Service.findOneAndDelete({_id: id})
  if(!service) {
    logger.error("Error deleting service:", `No such service: id ${id}`);
    return res.status(400).json({error: 'No such service'})
  }
  res.status(200).json(service)
}
module.exports = {
  getServices,
  getService,
  bookService,
  updateServiceStatus,
  getServiceCount,
  deleteService,
}
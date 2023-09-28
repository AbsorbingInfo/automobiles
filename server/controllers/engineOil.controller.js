const EngineOil = require('../models/engineOil')
const mongoose = require('mongoose')
const logger = require('../helpers/logger').logger

const createEngineOil = async(customerId, date, nextDueDate) => {
    try{
        await EngineOil.create({ customerId, date, nextDueDate })
    }catch(error){
        logger.error("error creating engine oil:",error)
    }
} 
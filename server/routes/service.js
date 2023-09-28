const express = require('express')
const router = express.Router()
const {
    getServices,
    getService,
    bookService,
    updateServiceStatus,
    getServiceCount,
    deleteService
  } = require('../controllers/serviceController')
const requireAuth = require('../middleware/requireAuth');

//POST a new service
router.post('/',bookService)

//Auth
router.use(requireAuth)

//GET all
router.get('/',getServices)

//GET count
router.get('/count',getServiceCount)

//GET single
router.get('/:id',getService)

//Delete a service
router.delete('/:id',deleteService)

// Update the status of a service
router.put('/:id', updateServiceStatus);


module.exports = router
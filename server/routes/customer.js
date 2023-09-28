const express = require('express');
const router = express.Router();
const {
    getCustomers,
    getCustomer,
    getCustomersByIds,
    createCustomer,
    getCustomerCount,
    checkCustomerByRegisteredNo,
    createCustomerExcel,
    updateAdhaarCardNo,
    updateBirthdayClaimDate
  } = require('../controllers/customerController');
const requireAuth = require('../middleware/requireAuth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const absolutePath = path.join(__dirname, '../assets/uploads');
    cb(null, absolutePath);
  },
   filename: (req, file, cb) => {
     const filename = file.originalname;
     cb(null, filename);
   }
});

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: storage
});


//POST a new customer
router.post('/excel',upload.single('Excel') ,createCustomerExcel)

//POST a new customer
router.post('/', createCustomer)

//GET check customer by registered number
router.get('/registerednumber/:id', checkCustomerByRegisteredNo)

//Auth
router.use(requireAuth)

//GET all
router.get('/',getCustomers)

//GET count
router.get('/count',getCustomerCount)

//GET multiple by IDs
router.get('/multiple/:ids?', getCustomersByIds);

//GET single customer
router.get('/:id', getCustomer)

//Update adhaar number
router.put('/aadhaar/:registeredNo', updateAdhaarCardNo)

//Update last birthday claim
router.put('/dob/:registeredNo', updateBirthdayClaimDate)

module.exports = router
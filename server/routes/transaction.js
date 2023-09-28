const express = require('express')
const router = express.Router()
const {
    createTransaction,
    getTransactionsByMechanicId,
    getTransactionsByCustomerId,
    getMonthlyTransactionsByMechanicId,
    getTotalRevenue,
    getTotalRevenueGst,
    getTotalRevenueNoGst,
    getTotalRevenueMechanic,
    getGstTransactionForLineChart
  } = require('../controllers/transactionController')
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


//GET a gst transaction for line
router.get('/linechart/:type', getGstTransactionForLineChart)

//Auth
router.use(requireAuth)

//GET a total revenue
router.get('/totalrevenue', getTotalRevenue)

//GET a total gst revenue
router.get('/gstrevenue', getTotalRevenueGst)

//GET a total no gst revenue
router.get('/nogstrevenue', getTotalRevenueNoGst)

//GET a total mechanic revenue
router.get('/mechanicrevenue', getTotalRevenueMechanic)

//GET a customer's Transactions
router.get('/:id', getTransactionsByCustomerId)

//GET a mechanics's Transactions
router.get('/mechanic/:id', getTransactionsByMechanicId)

//GET monthly mechanics's Transactions
router.get('/mechanic/monthly/:id', getMonthlyTransactionsByMechanicId)

//POST a new Offer
router.post('/',upload.single('invoice'), createTransaction)

module.exports = router
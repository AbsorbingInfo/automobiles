// Create the drive client
const credentials = require('../data/instant-theater-391310-599d1fabcee6.json');
const { createDriveClient } = require('../middleware/googleDrive');
const drive = createDriveClient(credentials);

// Import routes and controllers
const { storeTraffic, getTrafficCount } = require('../controllers/trafficController');
const holidaysController = require('../controllers/holidaysController');
const { loginAdmin } = require('../controllers/adminLoginController');
const serviceRoutes = require('../routes/service');
const offerRoutes = require('../routes/offer')(drive);
const customerRoutes = require('../routes/customer');
const mechanicRoutes = require('../routes/mechanic')(drive);
const transactionRoutes = require('../routes/transaction');
const batteryRoutes = require('../routes/battery');
const { adCompaign } = require('../controllers/adCampaignController')
const multer = require('multer');
const express = require('express');
const router = express.Router();
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const absolutePath = path.join(__dirname, '../assets/uploads');
    cb(null, absolutePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: storage
});


// Routes
router.get('/', storeTraffic);
router.post('/adminlogin', loginAdmin);
router.get('/count', getTrafficCount);
router.get('/holidays', holidaysController.getNextUpcomingHolidays);
router.use('/service', serviceRoutes);
router.use('/offer', offerRoutes);
router.use('/invoice', transactionRoutes);
router.use('/customer', customerRoutes);
router.use('/mechanic', mechanicRoutes);
router.use('/battery', batteryRoutes)
router.post('/adcampaign', upload.fields([{ name: 'OfferImage', maxCount: 1 }, { name: 'Excel', maxCount: 1 }]), adCompaign)


module.exports = router;
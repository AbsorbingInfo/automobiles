const express= require('express');
const router = express.Router();
const {
    getBatteryRecords,
    getBatterycount,
    getBatteryRecord,
    createBatteryRecord,
    addReplacementBattery,
    updateReceivedFromCustomerDate,
    updateSentToDealerDate,
    updateReceivedFromDealerDate,
    updateDeliveredDate
} = require('../controllers/batteryController');

const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth)

router.get('/count', getBatterycount)

router.get('/:id', getBatteryRecord)

router.get('/', getBatteryRecords)

router.post('/', createBatteryRecord)

router.put('/replacement/:id', addReplacementBattery)

router.put('/recievedfromcustomer/:id', updateReceivedFromCustomerDate)

router.put('/senttodealer/:id', updateSentToDealerDate)

router.put('/receivedfromdealer/:id', updateReceivedFromDealerDate)

router.put('/delivered/:id', updateDeliveredDate)

module.exports = router;
const Traffic = require('../models/trafficModel');
const logger = require('../helpers/logger').logger

const storeTraffic = async (req, res) => {
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'];
    try {
      const existingTraffic = await Traffic.findOne({ ipAddress });
      if (!existingTraffic) {
        const traffic = await Traffic.create({ ipAddress, userAgent })
        res.status(200).json(traffic)
      }
  
    } catch (error) {
      logger.error("Error saving traffic data:", error);
      console.error('Error saving traffic data:', error);                           //temp
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Get number of traffic.
    const getTrafficCount = async (req, res) => {
        try {
        const trafficCount = await Traffic.countDocuments({});
        res.status(200).json({ count: trafficCount });
        } catch (error) {
          console.error('Error getting traffic count:', error);  
        res.status(500).json({ error: 'Internal Server error' });
        }
    };

module.exports = {
  storeTraffic,
  getTrafficCount
}
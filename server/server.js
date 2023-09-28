const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
//const { configureGeneralLogger } = require('./helpers/logger');
const { dbConnection } = require('./helpers/dbHelper');
const routes = require('./helpers/routes');
const cron = require('node-cron');
const { birthadayWish, engineOilReminder, serviceDueReminder } = require('./helpers/dailyScheduler')
const logger = require('./helpers/logger').logger

//init
const app = express();

// Morgan middleware with custom logging using Winston
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  })
)

//Rate Limiting
const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

//Scheduler
cron.schedule('0 8 * * *', () => {
  birthadayWish()
  engineOilReminder()
  serviceDueReminder()
});

// Middlewares
app.use(express.json());
app.use(cors());
//app.use(rateLimitMiddleware)

//Routes
app.use('/', routes);

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error(err);

  res.status(500).json({
    error: {
      message: "Internal Server Error",
    },
  });
});

// Connect to the database and start the server
dbConnection(app);

module.exports = logger
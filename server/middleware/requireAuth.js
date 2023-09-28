const jwt = require('jsonwebtoken')
const path = require('path');
const winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: path.join(__dirname,"../", "logs", "auth.log"),
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
  exitOnError: false,
});

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    logger.error('Request is not authorized',req.originalUrl);
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    jwt.verify(token, process.env.SECRET)
    next()
    
  } catch (error) {
    console.log(error)
    logger.error('Request is not authorized', error);
    res.status(401).json({error: 'Request is not authorized'});
  }
}

module.exports = requireAuth
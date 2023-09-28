const path = require('path');
const winston = require("winston");

const configureGeneralLogger = () => {
  const accessLogStream = path.join(__dirname,"../" ,"logs", "General.log");
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        level: "info",
        filename: accessLogStream,
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 5,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
      }),
    ],
    exitOnError: false,
  });
  return logger
}
const logger = configureGeneralLogger()
exports.logger = logger;
